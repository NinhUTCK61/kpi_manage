import { InputStyled, MenuItem } from '@/libs/shared/components'
import {
  Select as MuiSelect,
  SelectChangeEvent,
  Stack,
  SvgIcon,
  SvgIconProps,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ShapeType1Icon from 'public/assets/svgs/shape_1.svg'
import ShapeType2Icon from 'public/assets/svgs/shape_2.svg'
import ShapeType3Icon from 'public/assets/svgs/shape_3.svg'
import ShapeType4Icon from 'public/assets/svgs/shape_4.svg'

type ChoseShapeTypes = {
  shape: string
  handleChangeShape(shape: string): void
}

function DropDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 17 16" sx={{ height: 16, width: 16 }} {...props}>
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.02827 5.52859C4.28862 5.26824 4.71073 5.26824 4.97108 5.52859L8.49967 9.05719L12.0283 5.52859C12.2886 5.26824 12.7107 5.26824 12.9711 5.52859C13.2314 5.78894 13.2314 6.21105 12.9711 6.4714L8.97108 10.4714C8.71073 10.7317 8.28862 10.7317 8.02827 10.4714L4.02827 6.4714C3.76792 6.21105 3.76792 5.78894 4.02827 5.52859Z"
          fill="#222222"
        />
      </svg>
    </SvgIcon>
  )
}

const ChoseShape: React.FC<ChoseShapeTypes> = ({ shape, handleChangeShape }) => {
  const { t } = useTranslation('file')
  const shapes = [
    { value: '1', icon: ShapeType1Icon },
    { value: '2', icon: ShapeType2Icon },
    { value: '3', icon: ShapeType3Icon },
    { value: '4', icon: ShapeType4Icon },
  ]

  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="body2">{t('shape')}</Typography>

      <Select
        value={shape}
        onChange={(event: SelectChangeEvent<unknown>) =>
          handleChangeShape(event.target.value as string)
        }
        input={<CustomInput sx={{}} />}
        IconComponent={DropDownIcon}
      >
        {shapes.map((item) => (
          <MenuItem key={item.value} value={item.value} sx={{ width: 72 }}>
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
  width: 72,
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
  py: 0,
})

export { ChoseShape, DropDownIcon }
