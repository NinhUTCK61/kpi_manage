import { genDaysInMonth, getYearsOption, monthArr } from '@/libs/utils/date'
import { Autocomplete, AutocompleteProps, Stack, styled } from '@mui/material'
import { format, isValid } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import { useEffect, useState } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputStyled } from '../Input'
import { AddDivControlProps, DivFormControl } from '../Input/DivFormControl'
import { FCWithLabel } from './FCWithLabel'

export type DatePickerSeparatorProps<T extends FieldValues> = UseControllerProps<T> &
  AddDivControlProps & {
    splitString?: string
    yearLabel?: string
    monthLabel?: string
    dateLabel?: string
  }

const yearOptions = getYearsOption()

const StyledAutocomplete = styled((props: AutocompleteProps<string, false, true, false>) => (
  <Autocomplete
    clearIcon={false}
    popupIcon={<Image src={ArrowDown} width={16} height={16} alt="arrow" />}
    {...props}
  />
))({
  minWidth: 142,
  '&& .MuiOutlinedInput-root': {
    padding: '0 4px 0 4px',
  },
})

function DatePickerSeparator<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  required,
  splitString = '-',
}: DatePickerSeparatorProps<T>) {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  const { t } = useTranslation('common')

  const [year, setYear] = useState<string | null>(null)
  const [month, setMonth] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    const parseDateValue = isValid(new Date(value ?? ''))
      ? format(new Date(value), 'yyyy-MM-dd')
      : null

    if (parseDateValue) {
      const [y, m, d] = parseDateValue.split('-')
      setYear(y ?? null)
      setMonth(m ?? null)
      setDate(d ?? null)
    }
  }, [splitString, value])

  const handleChangeValue = (newValue: string, type: 'year' | 'month' | 'date') => {
    let dt: string
    const time = 'T00:00:00Z'

    switch (type) {
      case 'year':
        setYear(newValue)
        dt = [newValue, month, date].join(splitString) + time
        break
      case 'month':
        setMonth(newValue)

        // validate date when change month
        const dateOptions = genDaysInMonth(new Date(`${year}-${newValue}`))
        const isValidDate = dateOptions.some((d) => d === date)
        if (!isValidDate) {
          setDate(null)
          dt = [year, newValue, null].join(splitString) + time
          break
        }

        dt = [year, newValue, date].join(splitString) + time
        break
      default:
        setDate(newValue)
        dt = [year, month, newValue].join(splitString) + time
        break
    }

    const emptyDate = dt.replaceAll(splitString, '') === time
    onChange(emptyDate ? null : dt)
  }

  const dateOptions = genDaysInMonth(new Date(`${year}-${month}`))

  return (
    <DivFormControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      helperText={helperText}
    >
      <Stack direction="row" justifyContent="space-between">
        <FCWithLabel label={t('select_year') as string}>
          <StyledAutocomplete
            options={yearOptions}
            value={year as string}
            onChange={(_, newValue) => handleChangeValue(newValue, 'year')}
            renderInput={(params) => (
              <InputStyled
                error={!!error}
                fullWidth
                placeholder={t('year') as string}
                {...params.InputProps}
                inputProps={params.inputProps}
              />
            )}
          />
        </FCWithLabel>

        <FCWithLabel label={t('select_month') as string}>
          <StyledAutocomplete
            options={monthArr}
            value={month as string}
            onChange={(e, newValue) => handleChangeValue(newValue, 'month')}
            renderInput={(params) => (
              <InputStyled
                fullWidth
                error={!!error}
                placeholder={t('month') as string}
                {...params.InputProps}
                inputProps={params.inputProps}
              />
            )}
          />
        </FCWithLabel>

        <FCWithLabel label={t('select_day') as string}>
          <StyledAutocomplete
            options={dateOptions}
            value={date as string}
            onChange={(e, newValue) => handleChangeValue(newValue, 'date')}
            renderInput={(params) => (
              <InputStyled
                fullWidth
                error={!!error}
                placeholder={t('day') as string}
                {...params.InputProps}
                inputProps={params.inputProps}
              />
            )}
          />
        </FCWithLabel>
      </Stack>
    </DivFormControl>
  )
}

export { DatePickerSeparator }
