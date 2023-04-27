import {
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox,
  SvgIcon,
  Typography,
  styled,
  type SvgIconProps,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'

function CheckedICon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <rect width="100%" height="100%" fill="#F9F5FF" />
      <svg
        width="20px"
        height="20px"
        viewBox="-2.7 -3.5 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4.5" cy="4" r="4" fill="#3E19A3" />
      </svg>
    </SvgIcon>
  )
}

function CheckICon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.8333 0.5H2.16667C1.25 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5ZM13.8333 13.8333H2.16667V2.16667H13.8333V13.8333ZM12.9917 5.5L11.8167 4.31667A0.5 0.5 0 0 0 10.6833 4.31667H6.325A0.5 0.5 0 0 0 5.19167 4.31667L4.01667 5.5H12.9917Z" />
      </svg>
    </SvgIcon>
  )
}

const Checkbox = styled(MuiCheckbox)({
  padding: '0 0 0 2px',
})

type PropChangeFeature = {
  changeFeature: {
    isAccept: boolean
    setIsAccept: Dispatch<SetStateAction<boolean>>
  }
}

const AcceptLaw: React.FC<PropChangeFeature> = ({ changeFeature }) => {
  const { t } = useTranslation(['sign_up'])
  const handleCheckbox = () => {
    changeFeature.setIsAccept(!changeFeature.isAccept)
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            value={changeFeature.isAccept}
            onChange={handleCheckbox}
            icon={
              <CheckICon
                sx={{
                  height: 20,
                  width: 20,
                  border: '1px solid #3E19A3',
                  borderRadius: '50%',
                  margin: '0 8px',
                }}
              />
            }
            checkedIcon={
              <CheckedICon
                sx={{
                  height: 20,
                  width: 20,
                  border: '1px solid #3E19A3',
                  borderRadius: '50%',
                  margin: '0 8px',
                }}
              />
            }
          />
        }
        label={<Typography variant="body2">{t('text_law1')}</Typography>}
      />
    </FormGroup>
  )
}

export { AcceptLaw }
