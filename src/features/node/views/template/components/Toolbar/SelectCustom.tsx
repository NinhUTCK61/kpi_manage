import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, styled } from '@mui/material'

type SelectFontSizeTypes = {
  value: string
  handleChange(value: string): void
  options: {
    value: string
    label: string
  }[]
}

const SelectCustom: React.FC<SelectFontSizeTypes> = ({ value, handleChange, options }) => {
 

  return (
    <Select
      value={value}
      onChange={(event: SelectChangeEvent<unknown>) => handleChange(event.target.value as string)}
      input={
        <InputStyled
          sx={{
            '& fieldset': {
              border: 'none',
            },
            '& .MuiOutlinedInput-input': {
              pl: 1.5,
              py: 0.75,
              fontSize: 15,
              lineHeight: '22px',
            },
          }}
        />
      }
    >
      {options.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )
}

const Select = styled(MuiSelect)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  paddingRight: 8,
  marginRight: 12,
}))

export { SelectCustom }
