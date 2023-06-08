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
import { Circular, MediumRoundSquare, RoundSquare, SquareShape } from '../icons'

const shapes = [
  { el: SquareShape, type: ShapeType.SQUARE },
  { el: Circular, type: ShapeType.CIRCULAR },
  { el: MediumRoundSquare, type: ShapeType.MEDIUM_ROUND_SQUARE },
  { el: RoundSquare, type: ShapeType.ROUND_SQUARE },
]

const ChooseShape: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.ROUND_SQUARE)
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const filterColor = () => {
    const style = {
      fill: base.white,
      stroke: base.black,
    }
    if (!nodeFocusedMemo) return style
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const bgColor = nodeStyle.background || customPrimary[700]
    if (nodeFocusedMemo.data.layout === LayoutType.STROKE) {
      return Object.assign(style, {
        fill: base.white,
        stroke: base.black,
      })
    }

    return Object.assign(style, {
      fill: bgColor,
      stroke: bgColor,
    })
  }

  const svgColor = filterColor()

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleShapeChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as ShapeType
    setShape(value)

    if (!nodeFocusedMemo) return
    const style =
      nodeFocusedMemo.type === 'speech_ballon' &&
      JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    const isCircularShape = value !== 'ROUND_SQUARE' && style.width && style.height

    const height =
      isCircularShape && Number(style.width.split('px')[0]) > Number(style.height.split('px')[0])
        ? style.width
        : style.height

    const width =
      isCircularShape && Number(style.height.split('px')[0]) > Number(style.width.split('px')[0])
        ? style.height
        : style.width

    const newNodeStyle = JSON.stringify({ ...style, height, width })

    updateReactFlowNode(
      {
        shape: value,
        id: nodeFocusedMemo.id,
        is_saved: nodeFocusedMemo.data.is_saved,
        node_style: newNodeStyle,
      },
      'speech_ballon',
    )
  }

  useEffect(() => {
    if (!nodeFocusedMemo) return
    const shapeType = nodeFocusedMemo.data.shape
    shapeType ? setShape(shapeType as ShapeType) : setShape(ShapeType.ROUND_SQUARE)
  }, [nodeFocusedMemo])

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Select
        value={shape}
        onChange={handleShapeChange}
        input={
          <CustomInput
            sx={{ '& svg': { fill: svgColor.fill }, '& svg rect': { stroke: svgColor.stroke } }}
          />
        }
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
      >
        {shapes.map((item, index) => {
          const SvgEl = item.el
          return (
            <MenuItem
              key={index}
              value={item.type}
              sx={{ width: 72 }}
              autoFocus={item.type === ShapeType.ROUND_SQUARE}
            >
              <SvgEl
                inheritViewBox
                sx={{
                  color: svgColor.fill,
                  '& rect': { stroke: svgColor.stroke },
                }}
              />
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
