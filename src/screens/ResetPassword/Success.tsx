import { Button, Fade, Slide, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from 'public/assets/svgs/logo.svg'

const Success: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('sign_up')
  const isSuccess = true

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <Fade in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
      <Slide direction="left" in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
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
            <Image src={Logo} alt="logo" />
            <Typography variant="h2" mb={0.5} mt={1.5}>
              Change Password Successfully!
            </Typography>
            <Typography color="greyScale.600">
              You have successfully changed your password
            </Typography>
          </Stack>

          <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
            <Button fullWidth variant="contained" onClick={redirectSignIn}>
              Back to log in
            </Button>
          </Stack>
        </Stack>
      </Slide>
    </Fade>
  )
}

export { Success }
