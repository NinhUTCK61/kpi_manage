import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, StackProps, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useEffect, useState, useTransition } from 'react'
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
  const [pickColor, setPickColor] = useState<string>(color as string)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (isPending) return
    changeNodeColor(pickColor)
  }, [changeNodeColor, isPending, pickColor])

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

export { PickColor }
