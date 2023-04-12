import { LayoutUnAuth } from '@/components/Layout'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Email from 'public/assets/imgs/email.png'

const SendMailSuccess: NextPage = () => {
  const router = useRouter()
  const handleSubmit = () => {
    router.push('/')
  }
  return (
    <LayoutUnAuth title="Send Mail Success">
      <Stack direction="row" justifyContent="center" pt={10}>
        <Stack
          sx={{ width: 450, height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}
        >
          <Stack alignItems="center" mb={2}>
            <Image
              src={Email}
              alt="email"
              style={{
                marginBottom: '12px',
              }}
            />
            <Typography variant="h2" fontWeight={700}>
              Forgot Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.greyScale[600],
                fontWeight: 400,
                marginTop: 4,
                fontSize: '15px',
                textAlign: 'center',
              }}
            >
              We&#39;ve sent an email with a password reset link to your registered email address.
            </Typography>
          </Stack>
          <Stack width="100%" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleSubmit()}
              sx={{ textTransform: 'capitalize' }}
            >
              Ok
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export { SendMailSuccess }
