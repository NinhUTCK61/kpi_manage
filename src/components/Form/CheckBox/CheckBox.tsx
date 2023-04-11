import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  SvgIcon,
  Typography,
  type SvgIconProps,
} from '@mui/material'
function CheckedICon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.8333 0.5H2.16667C1.25 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5ZM13.8333 13.8333H2.16667V2.16667H13.8333V13.8333ZM12.9917 5.5L11.8167 4.31667L6.325 9.80833L4.175 7.66667L2.99167 8.84167L6.325 12.1667L12.9917 5.5Z"
          fill="black"
        />
      </svg>
    </SvgIcon>
  )
}

function CheckICon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.8333 0.5H2.16667C1.25 0.5 0.5 1.25 0.5 2.16667V13.8333C0.5 14.75 1.25 15.5 2.16667 15.5H13.8333C14.75 15.5 15.5 14.75 15.5 13.8333V2.16667C15.5 1.25 14.75 0.5 13.8333 0.5ZM13.8333 13.8333H2.16667V2.16667H13.8333V13.8333ZM12.9917 5.5L11.8167 4.31667L6.325"
          fill="black"
        />
      </svg>
    </SvgIcon>
  )
}

type CheckBoxTypes = {
  value: boolean
  label: string
  onClick(): void
} & CheckboxProps

const CheckBox: React.FC<CheckBoxTypes> = ({ value, label, onClick, ...props }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onClick={onClick}
            icon={
              <CheckICon
                sx={{
                  height: 15,
                }}
              />
            }
            checkedIcon={
              <CheckedICon
                sx={{
                  height: 15,
                }}
              />
            }
            {...props}
          />
        }
        label={<Typography variant="body2">{label}</Typography>}
      />
    </FormGroup>
  )
}

export { CheckBox }
