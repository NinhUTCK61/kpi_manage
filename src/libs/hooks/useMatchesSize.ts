import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/system'

const useMatchesSize = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isLarge = useMediaQuery(theme.breakpoints.up('md'))
  const isDownLarge = useMediaQuery(theme.breakpoints.down('lg'))

  return { isSmall, isMedium, isLarge, isDownLarge }
}

export { useMatchesSize }
