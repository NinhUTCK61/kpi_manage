import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, styled } from '@mui/material'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import ShapeType1Icon from 'public/assets/svgs/shape_1.svg'
import ShapeType2Icon from 'public/assets/svgs/shape_2.svg'
import ShapeType3Icon from 'public/assets/svgs/shape_3.svg'
import ShapeType4Icon from 'public/assets/svgs/shape_4.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

export const enum ShapeType {
  SQUARE = 'SQUARE',
  CIRCULAR = 'CIRCULAR',
  MEDIUM_ROUND_SQUARE = 'MEDIUM_ROUND_SQUARE',
  ROUND_SQUARE = 'ROUND_SQUARE',
}

const shapes = [
  { value: '1', icon: ShapeType1Icon, type: ShapeType.SQUARE },
  { value: '2', icon: ShapeType2Icon, type: ShapeType.CIRCULAR },
  { value: '3', icon: ShapeType3Icon, type: ShapeType.MEDIUM_ROUND_SQUARE },
  { value: '4', icon: ShapeType4Icon, type: ShapeType.ROUND_SQUARE },
]

const ChooseShape: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.MEDIUM_ROUND_SQUARE)

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocuseMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const { updateSpeechBallonShape } = useNodeUpdateHandler(nodeFocuseMemo)

  const handleShapeChange = (value: ShapeType) => {
    setShape(value)

    if (!nodeFocuseMemo) return

    updateSpeechBallonShape(value)
  }

  useEffect(() => {
    if (!nodeFocuseMemo) return
    const shapeType = nodeFocuseMemo.data.shape
    shapeType ? setShape(shapeType as ShapeType) : setShape(ShapeType.MEDIUM_ROUND_SQUARE)
  }, [nodeFocuseMemo])
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Select
        value={shape}
        onChange={(event: SelectChangeEvent<unknown>) =>
          handleShapeChange(event.target.value as ShapeType)
        }
        input={<CustomInput />}
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
      >
        {shapes.map((item) => (
          <MenuItem
            key={item.value}
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
