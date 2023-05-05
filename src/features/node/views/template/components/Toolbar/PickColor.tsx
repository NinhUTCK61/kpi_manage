import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, StackProps, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useCallback, useTransition } from 'react'
import { shallow } from 'zustand/shallow'

type PickColorTypes = {
  forShape?: boolean
} & StackProps

const PickColor: React.FC<PickColorTypes> = ({ forShape, ...props }) => {
  const { t } = useTranslation('file')
  const color = useRFStore((state) => (forShape ? state.colorShape : state.nodeColor), shallow)
  const changeNodeColor = useRFStore(
    (state) => (forShape ? state.changeShapeColor : state.changeNodeColor),
    shallow,
  )
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const updateStyleNode = useRFStore((state) => state.updateStyleNode)

  const [isPen, startTransition] = useTransition()

  const changeColor = useCallback(
    (color: string) => {
      if (forShape) return
      if (isPen) return
      changeNodeColor(color)
      if (nodeFocused) updateStyleNode(nodeFocused as string, { color })
    },
    [changeNodeColor, forShape, isPen, nodeFocused, updateStyleNode],
  )

  const id = forShape ? 'colorShape' : 'color'

  return (
    <Tooltip title={t(forShape ? 'fill' : 'text_color')} arrow>
      <Stack direction="row" height={36} alignItems="center" {...props}>
        <Stack
          sx={{
            backgroundColor: color,
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
          {color && color.replace('#', '')}
        </Button>

        <InputStyled
          id={id}
          type="color"
          onChange={(e) => {
            startTransition(() => {
              changeColor(e.target.value)
            })
          }}
          value={color}
          label={color}
          sx={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
        />
      </Stack>
    </Tooltip>
  )
}

export { PickColor }
