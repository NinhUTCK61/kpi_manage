import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { useNodeUpdateMutation } from '@/libs/react-flow/components/KPINode/hooks'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { useDebounce } from 'usehooks-ts'

const PickColorNode: React.FC = () => {
  const { t } = useTranslation('file')
  const [isPending, startTransition] = useTransition()
  const { mutate: update } = useNodeUpdateMutation()
  const nodeFocus = useRFStore((state) => state.nodeFocus)

  const id = 'color'

  const nodeStyle = useMemo(() => {
    return nodeFocus?.type === 'kpi' && JSON.parse(nodeFocus?.data?.node_style || '{}')
  }, [nodeFocus])

  const [pickColor, setPickColor] = useState<string>(
    nodeStyle?.color ? nodeStyle.color : base.black,
  )

  const debouncedColor = useDebounce<string>(pickColor, 300)

  useEffect(() => {
    if (!nodeStyle.color) {
      setPickColor(base.black)
    } else {
      setPickColor(nodeStyle.color)
    }
    console.log('chang nodefocus')
  }, [nodeStyle])

  const handleUpdate = useCallback(() => {
    if (nodeFocus?.data.template_id && nodeFocus.type === 'kpi') {
      if (debouncedColor === nodeStyle.color) return
      // update({
      //   id: nodeFocus.id,
      //   node_style: JSON.stringify({
      //     ...nodeStyle,
      //     color: debouncedColor,
      //   }),
      // })
      console.log('update color', debouncedColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debouncedColor, update])
  }, [debouncedColor, nodeStyle])
  useEffect(() => {
    handleUpdate()
  }, [handleUpdate, debouncedColor])

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
