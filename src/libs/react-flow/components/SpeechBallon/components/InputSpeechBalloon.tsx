import { BaseInputProps } from '@/libs/shared/components'
import { FormControl, InputBase, InputBaseProps, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

type InputNodeProps<T extends FieldValues> = BaseInputProps<T> & InputBaseProps

function InputSpeechBalloon<T extends FieldValues>({
  name,
  control,
  defaultValue,
  controlProps,
  required,
  fullWidth,
  ...props
}: InputNodeProps<T>) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({ name, control, defaultValue })

  return (
    <FormControl fullWidth={fullWidth} required={required} {...controlProps}>
      <InputStyled {...inputProps} {...props} inputRef={ref} value={value} />
    </FormControl>
  )
}

const InputStyled = styled(InputBase)(({ theme, readOnly }) => ({
  color: theme.palette.customPrimary[0o0],
  fontSize: 15,
  fontWeight: 400,
  lineHeight: '22px',
  minWidth: 210,
  minHeight: 36,
  ...(readOnly && {
    cursor: 'grab !important',
  }),
  textarea: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    ...(readOnly && {
      cursor: 'grab !important',
    }),
  },
}))

export { InputSpeechBalloon }
