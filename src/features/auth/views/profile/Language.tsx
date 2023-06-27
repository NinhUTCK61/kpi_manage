import { FormControl, FormLabel, MenuItem, Select, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import { InputStyled } from './Input'

type LanguageType = {
  edit: boolean
}

export const Language: React.FC<LanguageType> = ({ edit }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
  const router = useRouter()

  const languages = [
    {
      id: 'en',
      title: t('english'),
    },
    {
      id: 'jp',
      title: t('japan'),
    },
  ]

  const changLanguage = (locale: string) => {
    const { pathname, asPath, query } = router

    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <FormControl fullWidth>
      <FormLabel>{t('language_title')}</FormLabel>
      {edit ? (
        <SelectStyled value={languages.find((e) => e.id === language)?.id}>
          {languages.map((e) => (
            <MenuItem key={e.id} onClick={() => changLanguage(e.id)} value={e.id}>
              <Typography variant="body2" color="black">
                {e.title}
              </Typography>
            </MenuItem>
          ))}
        </SelectStyled>
      ) : (
        <InputStyled value={languages.find((e) => e.id === language)?.title} readOnly />
      )}
    </FormControl>
  )
}

const SelectStyled = styled(Select)({
  '& .MuiOutlinedInput-input': {
    padding: '8px 12px',
  },
})
