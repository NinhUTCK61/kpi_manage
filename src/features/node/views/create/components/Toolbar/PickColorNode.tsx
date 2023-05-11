import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { useNodeUpdateMutation } from '@/libs/react-flow/components/KPINode/hooks'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useDebounce } from 'usehooks-ts'

const PickColorNode: React.FC = () => {
  const { t } = useTranslation('file')
  const [pickColor, setPickColor] = useState<string>(base.black)
  const [isPending, startTransition] = useTransition()
  const { mutate: update } = useNodeUpdateMutation()
  const debouncedColor = useDebounce<string>(pickColor, 300)
  const getKPINodeFocus = useRFStore((state) => state.getKPINodeFocus)
  const nodeFocus = getKPINodeFocus()

  const id = 'color'
  useEffect(() => {
    if (!nodeFocus) {
      setPickColor(base.black)
      console.log('set black 1')
      return
    }

    if (nodeFocus.type === 'kpi' && nodeFocus.data.node_style) {
      const nodeColor = JSON.parse(nodeFocus.data.node_style as string).color
      if (!nodeColor) {
        setPickColor(base.black)
      } else {
        setPickColor(nodeColor)
        console.log('has color', nodeColor)
      }
    }
    console.log('change node focus')
  }, [nodeFocus])

  const handleUpdate = useCallback(() => {
    if (nodeFocus && nodeFocus.data.template_id && nodeFocus.type === 'kpi') {
      const _nodeFocus = nodeFocus.data
      const _nodeStyle = JSON.parse(_nodeFocus.node_style as string) || {}
      console.log(debouncedColor, _nodeStyle.color)
      if (debouncedColor === _nodeStyle.color) return

      update({
        ..._nodeFocus,
        node_style: JSON.stringify({
          ..._nodeStyle,
          color: debouncedColor,
        }),
      })
    }
  }, [debouncedColor, nodeFocus, update])

  useEffect(() => {
    if (isPending) return
    console.log('effect update')
    handleUpdate()
  }, [debouncedColor, handleUpdate, isPending])

  return (
    <Tooltip title={t('text_color')} arrow>
      <Stack direction="row" height={36} alignItems="center" mr={3}>
        <Stack
          sx={{
            backgroundColor: pickColor,
            borderRadius: '2px 0px 0px 2px',
            height: 36,
            width: 36,
            p: 0,
            cursor: 'pointer',
          }}
          component="label"
          htmlFor={id}
        />

        <Button
          component="label"
          htmlFor={id}
          sx={{
            backgroundColor: base.white,
            color: base.black,
            height: 36,
            borderRadius: 0,
            fontWeight: 400,
            p: '7px 14px 7px 8px',
            width: 74,
          }}
          disableRipple
        >
          {pickColor && pickColor.replace('#', '')}
        </Button>

        <InputStyled
          id={id}
          type="color"
          onChange={(e) => {
            startTransition(() => {
              setPickColor(e.target.value)
            })
          }}
          value={pickColor}
          label={pickColor}
          sx={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
        />
      </Stack>
    </Tooltip>
  )
}

export { PickColorNode }
