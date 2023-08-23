import { ShapeType } from '@/features/node/constant'
import { base, customPrimary } from '@/libs/config/theme'
import { ARROW_HEIGHT, ARROW_WIDTH, sizeStyleMapping, useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { pxToNumber } from '@/libs/utils/misc'
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

const DEFAULT_DEGREE_CHANGE = 'rotate(-2.15397deg)'

const ChooseShape: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.ROUND_SQUARE)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const widthHeightRatio =
    sizeStyleMapping[ShapeType.ROUND_SQUARE].width / sizeStyleMapping[ShapeType.ROUND_SQUARE].height

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
    if (nodeFocusedMemo.type !== 'speech_ballon') return

    const style = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const isRoundSquare = value === 'ROUND_SQUARE'
    const hasDimensionValue = style.width && style.height

    const dataUpdate = {
      shape: value,
      id: nodeFocusedMemo.id,
      is_saved: nodeFocusedMemo.data.is_saved,
    }

    if (hasDimensionValue) {
      let height, width
      const widthDefault = sizeStyleMapping[ShapeType.ROUND_SQUARE].width //default width of ROUND SQUARE

      if (isRoundSquare) {
        width = pxToNumber(style.width) < widthDefault ? `${widthDefault}px` : style.width
        height = `${pxToNumber(width) / widthHeightRatio}px`
      } else {
        height = pxToNumber(style.width) > pxToNumber(style.height) ? style.width : style.height
        width = pxToNumber(style.height) > pxToNumber(style.width) ? style.height : style.width
      }

      const percentResize = pxToNumber(height) / sizeStyleMapping[ShapeType.ROUND_SQUARE].height

      const newNodeStyle = JSON.stringify({
        ...style,
        height,
        width,
        arrowHeight: (pxToNumber(ARROW_HEIGHT) + pxToNumber(height)) / 2 + 'px',
        arrowWidth: Math.min(pxToNumber(ARROW_WIDTH) * percentResize, pxToNumber(height)) + 'px',
        arrowTransform: value !== ShapeType.ROUND_SQUARE ? DEFAULT_DEGREE_CHANGE : style.transform,
      })

      updateReactFlowNode(
        {
          ...dataUpdate,
          node_style: newNodeStyle,
        },
        'speech_ballon',
      )
    } else {
      const percentResize =
        sizeStyleMapping[value].height / sizeStyleMapping[ShapeType.ROUND_SQUARE].height
      const newNodeStyle = JSON.stringify({
        ...style,
        arrowHeight: (pxToNumber(ARROW_HEIGHT) + sizeStyleMapping[value].height) / 2 + 'px',
        arrowWidth: pxToNumber(ARROW_WIDTH) * percentResize + 'px',
        arrowTransform: value !== ShapeType.ROUND_SQUARE ? DEFAULT_DEGREE_CHANGE : style.transform,
      })

      updateReactFlowNode({ ...dataUpdate, node_style: newNodeStyle }, 'speech_ballon')
    }
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
          <InputStyled
            sx={{
              '& svg': { fill: svgColor.fill },
              '& svg rect': { stroke: svgColor.stroke },
              '& fieldset': {
                border: 'none',
              },
              '& .MuiOutlinedInput-input': {
                display: 'flex',
              },
            }}
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
              sx={{ width: '100%', padding: '0 16px 0 12px' }}
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

export { ChooseShape }
