import { Box, Button, Stack, styled } from '@mui/material'

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: theme.shadows[1],
  padding: 24,
  borderRadius: '12px',
  background: theme.palette.base.white,
  [theme.breakpoints.down('sm')]: {
    width: 340,
  },
}))

const CloseButton = styled(Button)({
  ':hover': {
    color: 'inherit',
  },
  padding: 0,
  minWidth: 0,
})

const ImagePreview = styled(Stack)(({ theme }) => ({
  width: 268,
  height: 206,
  justifyContent: 'center',
  borderRadius: 12,
  background: theme.palette.base.gray,
  overflow: 'hidden',
}))

export { BoxContainer, CloseButton, ImagePreview }
