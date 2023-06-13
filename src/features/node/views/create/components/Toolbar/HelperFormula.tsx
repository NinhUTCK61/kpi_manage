import { Stack, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material'
import Image from 'next/image'
import HelpIcon from 'public/assets/svgs/help.svg'

const HelperFormula = () => {
  return (
    <CustomToolTip
      arrow
      title={
        <Stack>
          <Typography variant="body2" fontWeight={600}>
            ※注意：
          </Typography>
          <Typography variant="body2" maxWidth={215}>
            ボックスの計算式項目に数字を正しく入力するには「半角英数字」か「英語」のキーボードに変更すること、又はテンキーを使用してください！
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
