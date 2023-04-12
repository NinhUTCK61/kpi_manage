import { Button, Fade, Slide, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Logo from 'public/assets/svgs/logo.svg'
import { CustomImage } from './Image'

const Success: React.FC<{ redirectSignIn(): void }> = ({ redirectSignIn }) => {
  const { t } = useTranslation('sign_up')

  const isSuccess = true

  return (
    <Fade in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
      <div>
        <Slide direction="left" in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
          <div>
            <Stack justifyContent="center" alignItems="center">
              <Stack
                sx={{
                  width: 'auto',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  mb: 2,
                  pt: 5,
                }}
              >
                <Stack alignItems="center" mb={4}>
                  <CustomImage src={Logo} alt="logo" />
                  <Typography variant="h2" fontWeight={700} sx={{ marginBottom: '4px' }}>
                    {t('title_success')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: (theme) => theme.palette.greyScale[600],
                      fontWeight: 400,
                    }}
                  >
                    {t('description_success')}
                  </Typography>
                </Stack>

                <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
                  <Button fullWidth variant="contained" onClick={redirectSignIn}>
                    {t('back')}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </div>
        </Slide>
      </div>
    </Fade>
  )
}

export { Success }
