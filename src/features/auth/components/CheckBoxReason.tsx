import {
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox,
  Typography,
  styled,
} from '@mui/material'
import Image from 'next/image'
import { Reason } from 'prisma/generated/zod'
import CheckedIcon from 'public/assets/svgs/checkbox-checked.svg'
import CheckIcon from 'public/assets/svgs/checkbox.svg'

type CheckBoxTypes = {
  label: string
  onClick: (id: number) => void
  reason: Reason
}

const Checkbox = styled(MuiCheckbox)({
  padding: '0 0 0 2px',
  marginRight: 8,
})

const CheckBoxReason: React.FC<CheckBoxTypes> = ({ label, onClick, reason }) => {
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          mx: 0,
        }}
        control={
          <Checkbox
            disableRipple
            name="reasons"
            onClick={() => onClick(reason.id)}
            icon={<Image src={CheckIcon} width={20} height={20} alt="checkbox" />}
            checkedIcon={<Image src={CheckedIcon} width={20} height={20} alt="checkbox" />}
          />
        }
        label={<Typography variant="body2">{label}</Typography>}
      />
    </FormGroup>
  )
}

export { CheckBoxReason }
