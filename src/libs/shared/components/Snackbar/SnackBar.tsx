import { api } from '@/libs/api'
import { AlertTitle, CircularProgress, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import {
  CustomContentProps,
  SnackbarContent,
  SnackbarProviderProps,
  closeSnackbar,
  enqueueSnackbar,
} from 'notistack'
import checked from 'public/assets/svgs/checked.svg'
import info from 'public/assets/svgs/info.svg'
import { forwardRef } from 'react'
import { Alert, ButtonStyle } from './styled'

declare module 'notistack' {
  interface VariantOverrides {
    // removes the `default` variant
    default: false

    success: {
      description?: string
    }
    error: {
      description?: string
      email?: string
    }
  }
}

interface CustomSnackbarProps extends CustomContentProps {
  description: string
  email: string
}

export const SnackbarCustom = forwardRef<HTMLDivElement, CustomSnackbarProps>(
  function CustomComponent(props, ref) {
    const { mutate, isLoading } = api.auth.resendVerifyEmail.useMutation()
    const { t } = useTranslation('common')
    const {
      id,
      message,
      description,
      email,
      persist: _persist,
      anchorOrigin: _anchorOrigin,
      iconVariant: _iconVariant,
      hideIconVariant: _hideIconVariant,
      autoHideDuration: _autoHideDuration,
      ...other
    } = props

    const onClose = () => {
      closeSnackbar(id)
    }

    return (
      <SnackbarContent ref={ref} role="alert" {...other}>
        <Alert
          iconMapping={{
            success: <Image src={checked} alt="success icon" />,
            error: <Image src={info} alt="error icon" />,
          }}
          onClose={onClose}
          severity={other.variant}
        >
          <AlertTitle>{message}</AlertTitle>
          {description && <Typography variant="body2">{description}</Typography>}
          {email && (
            <ButtonStyle
              variant="contained"
              onClick={() => {
                mutate(
                  { email },
                  {
                    onError(error) {
                      enqueueSnackbar(t(error.message), {
                        variant: 'error',
                      })
                    },
                    onSuccess() {
                      onClose()
                    },
                  },
                )
              }}
            >
              {isLoading ? <CircularProgress size="1.2rem" /> : t('verify_resend')}
            </ButtonStyle>
          )}
        </Alert>
      </SnackbarContent>
    )
  },
)

export const customComponents: SnackbarProviderProps['Components'] = {
  success: SnackbarCustom,
  error: SnackbarCustom,
}

export const defaultAnchor: SnackbarProviderProps['anchorOrigin'] = {
  vertical: 'top',
  horizontal: 'center',
}
