import { Stack, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import HelpIcon from 'public/assets/svgs/help.svg'

const HelperFormula = () => {
  const { t } = useTranslation('file')
  return (
    <CustomToolTip
      arrow
      title={
        <Stack>
          <Typography variant="body2" fontWeight={600}>
            {t('helper_1')}
          </Typography>
          <Typography variant="body2" maxWidth={215}>
            {t('helper_2')}
          </Typography>
        </Stack>
      }
    >
      <Image src={HelpIcon} alt="undo" />
    </CustomToolTip>
  )
}

const CustomToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: theme.spacing(1),
  },
}))

export { HelperFormula }
