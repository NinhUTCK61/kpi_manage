import { Button, styled } from '@mui/material'

const ButtonCreate = styled(Button)(({ theme }) => ({
  height: theme.spacing(10),
  width: 260,
  fontSize: 17,
  lineHeight: '22px',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.customPrimary[600],
  [theme.breakpoints.down('sm')]: {
    height: theme.spacing(5.5),
    width: 230,
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
}))

export { ButtonCreate }
