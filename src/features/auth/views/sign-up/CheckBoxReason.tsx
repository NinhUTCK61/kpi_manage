import {
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox,
  SvgIcon,
  Typography,
  styled,
  type SvgIconProps,
} from '@mui/material'
import { Reason } from 'prisma/generated/zod'

function CheckedICon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props}>
      <rect width="100%" height="100%" fill="#F9F5FF" />
      <svg
        width="20px"
        height="20px"
        viewBox="-1 -2.5 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8737 0.792893C12.2642 1.18342 12.2642 1.81658 11.8737 2.20711L5.45703 8.62377C5.0665 9.0143 4.43334 9.0143 4.04281 8.62377L1.12615 5.70711C0.735621 5.31658 0.735621 4.68342 1.12615 4.29289C1.51667 3.90237 2.14983 3.90237 2.54036 4.29289L4.74992 6.50245L10.4595 0.792893C10.85 0.402369 11.4832 0.402369 11.8737 0.792893Z"
          fill="#3E19A3"
        />
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

type CheckBoxTypes = {
  label: string
  onClick: (id: number) => void
  reason: Reason
}

const Checkbox = styled(MuiCheckbox)({
  padding: '0 0 0 2px',
})

const CheckBoxReason: React.FC<CheckBoxTypes> = ({ label, onClick, reason }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            name="reasons"
            onClick={() => onClick(reason.id)}
            icon={
              <CheckICon
                sx={{
                  height: 20,
                  width: 20,
                  border: '1px solid #3E19A3',
                  borderRadius: '6px',
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
                  borderRadius: '6px',
                  margin: '0 8px',
                }}
              />
            }
          />
        }
        label={<Typography variant="body2">{label}</Typography>}
      />
    </FormGroup>
  )
}

export { CheckBoxReason }
