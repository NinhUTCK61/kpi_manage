import {
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import RadioCheck from 'public/assets/svgs/radio-check.svg'
import RadioChecked from 'public/assets/svgs/radio-checked.svg'
import { Dispatch, SetStateAction } from 'react'

const Checkbox = styled(MuiCheckbox)({
  padding: '0 0 0 2px',
  marginRight: 8,
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
        sx={{
          mx: 0,
        }}
        control={
          <Checkbox
            disableRipple
            value={changeFeature.isAccept}
            onChange={handleCheckbox}
            icon={<Image src={RadioCheck} width={20} height={20} alt="arrow" />}
            checkedIcon={<Image src={RadioChecked} width={20} height={20} alt="arrow" />}
          />
        }
        label={<Typography variant="body2">{t('text_law1')}</Typography>}
      />
    </FormGroup>
  )
}

export { AcceptLaw }
