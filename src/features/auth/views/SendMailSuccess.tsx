import { greyScale } from '@/libs/config/theme'
import { LayoutUnAuth } from '@/libs/shared/components'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Email from 'public/assets/svgs/email.svg'
import { FC } from 'react'

const SendMailSuccess: FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/sign-in')
  }

  return (
    <LayoutUnAuth title="Send Mail Success">
      <Stack width={450} direction="column" alignItems="center" margin="auto" mt={10}>
        <Image src={Email} alt="email" />

        <Typography variant="h2" mt={1.5}>
          Forgot Password
        </Typography>

        <Typography
          variant="body1"
          marginTop={4}
          fontSize="15px"
          textAlign="center"
          color={greyScale[600]}
        >
          We&#39;ve sent an email with a password reset link to your registered email address.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={handleClick}
          sx={{ textTransform: 'capitalize', marginTop: 2 }}
        >
          Ok
        </Button>
      </Stack>
    </LayoutUnAuth>
  )
}

export { SendMailSuccess }
