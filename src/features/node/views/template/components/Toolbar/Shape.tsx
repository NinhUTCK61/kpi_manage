import { Stack, Typography } from '@mui/material'
import { PickColor } from './PickColor'
import { SelectCustom } from './SelectCustom'

type ShapeTypes = {
  stroke: string
  handleChangeStroke(stroke: string): void
  colorShape: string
  handleChangeColorShape(color: string): void
}

const Shape: React.FC<ShapeTypes> = ({
  stroke,
  handleChangeStroke,
  colorShape,
  handleChangeColorShape,
}) => {
  const strokes = [
    { value: '1', label: '1px' },
    { value: '2', label: '2px' },
    { value: '3', label: '3px' },
    { value: '4', label: '4px' },
  ]

  return (
    <Stack direction="row">
      <Stack spacing={1.5} alignItems="center" direction="row" mr={1.5}>
        <Typography variant="body2">Stroke</Typography>
        <SelectCustom value={stroke} handleChange={handleChangeStroke} options={strokes} />
      </Stack>

      <PickColor forShape color={colorShape} handleChangeColor={handleChangeColorShape} mr={1} />

      <Stack direction="row" alignItems="center">
        <Typography variant="body2">Shape</Typography>
      </Stack>
    </Stack>
  )
}

export { Shape }
