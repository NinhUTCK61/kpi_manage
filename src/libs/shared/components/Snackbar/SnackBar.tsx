import { AlertTitle, Typography } from '@mui/material'
import Image from 'next/image'
import {
  CustomContentProps,
  SnackbarContent,
  SnackbarProviderProps,
  closeSnackbar,
} from 'notistack'
import checked from 'public/assets/svgs/checked.svg'
import info from 'public/assets/svgs/info.svg'
import { forwardRef } from 'react'
import { Alert } from './styled'

declare module 'notistack' {
  interface VariantOverrides {
    // removes the `default` variant
    default: false

    success: {
      description?: string
    }
    error: {
      description?: string
    }
  }
}

interface CustomSnackbarProps extends CustomContentProps {
  description: string
}

export const SnackbarCustom = forwardRef<HTMLDivElement, CustomSnackbarProps>(
  function CustomComponent(props, ref) {
    const {
      id,
      message,
      description,
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
