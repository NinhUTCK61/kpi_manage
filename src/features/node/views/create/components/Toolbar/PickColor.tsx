import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { useNodeUpdateMutation } from '@/libs/react-flow/components/KPINode/hooks/useNodeUpdateMutation'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, StackProps, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type PickColorTypes = {
  forShape?: boolean
} & StackProps

const PickColor: React.FC<PickColorTypes> = ({ forShape, ...props }) => {
  const { t } = useTranslation('file')
  const color = useRFStore((state) => (forShape ? state.colorShape : state.nodeColor))
  const changeNodeColor = useRFStore((state) =>
    forShape ? state.changeShapeColor : state.changeNodeColor,
  )
  const nodeFocus = useRFStore((state) => state.nodeFocus)
  const [pickColor, setPickColor] = useState<string>(color as string)
  const { mutate: update } = useNodeUpdateMutation()
  const debouncedColor = useDebouncedCallback((value) => {
    setPickColor(value)
  }, 100)
  // TODO: handle update pick color when change node
  useLayoutEffect(() => {
    if (!nodeFocus) return
    if (forShape) return
    if (nodeFocus.type === 'kpi' && nodeFocus.data.node_style) {
      setPickColor(JSON.parse(nodeFocus.data.node_style as string).color)
    }
  }, [forShape, nodeFocus])
  // TODO: call api update node color
  const handleUpdate = useCallback(() => {
    if (forShape) return
    if (nodeFocus && nodeFocus.data.template_id && nodeFocus.type === 'kpi') {
      const _nodeFocus = nodeFocus.data
      const _nodeStyle = JSON.parse(_nodeFocus.node_style as string) || {}
      if (pickColor === _nodeStyle.color) return
      update({
        ..._nodeFocus,
        node_style: JSON.stringify({
          ..._nodeStyle,
          color: pickColor,
        }),
      })
    }
  }, [forShape, nodeFocus, pickColor, update])

  useEffect(() => {
    if (forShape) return
    changeNodeColor(pickColor)
    if (color !== pickColor) {
      handleUpdate()
    }
  }, [changeNodeColor, color, forShape, handleUpdate, pickColor])

  const id = forShape ? 'colorShape' : 'color'

  return (
    <Tooltip title={t(forShape ? 'fill' : 'text_color')} arrow>
      <Stack direction="row" height={36} alignItems="center" {...props}>
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
            debouncedColor(e.target.value)
          }}
          value={pickColor}
          label={pickColor}
          sx={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
        />
      </Stack>
    </Tooltip>
  )
}

export { PickColor }
