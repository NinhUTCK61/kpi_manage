import { ShapeType } from '@/features/node/constant'
import { base, customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, styled } from '@mui/material'
import { LayoutType } from '@prisma/client'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'
import { Circular, MediumRoundSquare, RoundSquare, SquareShape } from '../style'

const shapes = [
  { el: SquareShape, type: ShapeType.SQUARE },
  { el: Circular, type: ShapeType.CIRCULAR },
  { el: MediumRoundSquare, type: ShapeType.MEDIUM_ROUND_SQUARE },
  { el: RoundSquare, type: ShapeType.ROUND_SQUARE },
]

const ChooseShape: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.MEDIUM_ROUND_SQUARE)

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const fillColor = () => {
    if (!nodeFocusedMemo) return
    const bgStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (nodeFocusedMemo.data.layout === LayoutType.STROKE) return base.white
    return bgStyle.background || customPrimary[700]
  }

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleShapeChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as ShapeType
    setShape(value)

    if (!nodeFocusedMemo) return

    updateReactFlowNode(
      {
        shape: value,
        id: nodeFocusedMemo.id,
        is_saved: nodeFocusedMemo.data.is_saved,
      },
      'speech_ballon',
    )
  }

  useEffect(() => {
    if (!nodeFocusedMemo) return
    const shapeType = nodeFocusedMemo.data.shape
    shapeType ? setShape(shapeType as ShapeType) : setShape(ShapeType.MEDIUM_ROUND_SQUARE)
  }, [nodeFocusedMemo])

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Select
        value={shape}
        onChange={handleShapeChange}
        input={<CustomInput sx={{ '& svg': { fill: fillColor } }} />}
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
      >
        {shapes.map((item, index) => {
          const SvgEl = item.el
          return (
            <MenuItem
              key={index}
              value={item.type}
              sx={{ width: 72 }}
              autoFocus={item.type === ShapeType.MEDIUM_ROUND_SQUARE}
            >
              <SvgEl />
            </MenuItem>
          )
        })}
      </Select>
    </Stack>
  )
}

const Select = styled(MuiSelect)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  paddingRight: 8,
  marginRight: 12,
  height: 32,
  width: 76,
  background: theme.palette.common.white,
  '& .MuiSelect-icon': {
    top: 'auto',
  },
}))

const CustomInput = styled(InputStyled)({
  '& fieldset': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    display: 'flex',
  },
})

export { ChooseShape }
