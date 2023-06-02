import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, styled } from '@mui/material'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import SquareShape1Icon from 'public/assets/svgs/shape_1.svg'
import SquareShape2Icon from 'public/assets/svgs/shape_2.svg'
import SquareShape3Icon from 'public/assets/svgs/shape_3.svg'
import SquareShape4Icon from 'public/assets/svgs/shape_4.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

export const enum ShapeType {
  SQUARE = 'SQUARE',
  CIRCULAR = 'CIRCULAR',
  MEDIUM_ROUND_SQUARE = 'MEDIUM_ROUND_SQUARE',
  ROUND_SQUARE = 'ROUND_SQUARE',
}

const shapes = [
  { icon: SquareShape1Icon, type: ShapeType.SQUARE },
  { icon: SquareShape2Icon, type: ShapeType.CIRCULAR },
  { icon: SquareShape3Icon, type: ShapeType.MEDIUM_ROUND_SQUARE },
  { icon: SquareShape4Icon, type: ShapeType.ROUND_SQUARE },
]

const ChooseShape: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.MEDIUM_ROUND_SQUARE)

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const { updateSpeechBallonShape } = useNodeUpdateHandler(nodeFocusedMemo)

  const handleShapeChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as ShapeType
    setShape(value)

    if (!nodeFocusedMemo) return

    updateSpeechBallonShape(value)
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
        input={<CustomInput />}
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
      >
        {shapes.map((item, index) => (
          <MenuItem
            key={index}
            value={item.type}
            sx={{ width: 72 }}
            autoFocus={item.type === ShapeType.MEDIUM_ROUND_SQUARE}
          >
            <Image alt="shape" src={item.icon} />
          </MenuItem>
        ))}
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
