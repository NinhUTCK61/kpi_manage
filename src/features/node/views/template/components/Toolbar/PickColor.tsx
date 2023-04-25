import { base } from '@/libs/config/theme'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, StackProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

type PickColorTypes = {
  color: string
  handleChangeColor(color: string): void
  forShape?: boolean
} & StackProps

const PickColor: React.FC<PickColorTypes> = ({ color, handleChangeColor, forShape, ...props }) => {
  const { t } = useTranslation('file')

  const id = forShape ? 'colorShape' : 'color'
  return (
    <Stack direction="row" height={36} alignItems="center" {...props}>
      {!forShape && (
        <Typography variant="body2" color="base.black" mr={1}>
          {t('fill')}
        </Typography>
      )}
      <Stack
        sx={{
          backgroundColor: color,
          borderRadius: '2px 0px 0px 2px',
          height: 36,
          width: 36,
          p: 0,
          cursor: 'pointer',
        }}
        component="label"
        htmlFor={id}
      />

      <Button
        component="label"
        htmlFor={id}
        sx={{
          backgroundColor: base.white,
          color: base.black,
          height: 36,
          borderRadius: 0,
          fontWeight: 400,
          p: '7px 14px 7px 8px',
        }}
        disableRipple
      >
        {color.replace('#', '')}
      </Button>

      <InputStyled
        id={id}
        type="color"
        onChange={(e) => handleChangeColor(e.target.value)}
        value={color}
        label={color}
        sx={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
      />
    </Stack>
  )
}

export { PickColor }
