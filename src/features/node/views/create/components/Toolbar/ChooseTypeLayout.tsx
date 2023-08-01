import { base, customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import {
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CheckedIcon from 'public/assets/svgs/checked_layout.svg'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const ChooseTypeLayout: React.FC = () => {
  const { t } = useTranslation('file')
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const [checked, setChecked] = useState<boolean>(false)
  const { updateReactFlowNode } = useNodeUpdateHandler()
  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const handleChange = (event: ChangeEvent) => {
    const isCheckbox = (event.target as HTMLInputElement).checked

    if (!nodeFocusedMemo) return

    setChecked(!checked)
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const isTextColorValid =
      nodeStyle.color !== base.white && nodeStyle.color !== customPrimary[700]
    const defaultColor = isCheckbox ? base.white : customPrimary[700]
    const textColor = isTextColorValid ? nodeStyle.color : defaultColor
    const newNodeStyle = JSON.stringify({ ...nodeStyle, color: textColor })

    updateReactFlowNode(
      {
        layout: isCheckbox ? 'FILL' : 'STROKE',
        id: nodeFocusedMemo.data.id,
        is_saved: nodeFocusedMemo.data.is_saved,
        node_style: newNodeStyle,
      },
      'speech_ballon',
    )
  }

  useEffect(() => {
    if (!nodeFocusedMemo || nodeFocusedMemo.type !== 'speech_ballon') return
    setChecked(nodeFocusedMemo.data.layout === 'FILL' ? true : false)
  }, [nodeFocusedMemo])

  return (
    <Stack direction="row" alignItems="center" spacing={0.25} padding="0 8px">
      <FormGroup>
        <FormControlLabel
          sx={{
            mx: { xs: 'auto', sm: 0 },
          }}
          control={
            <Checkbox
              checked={checked}
              checkedIcon={<Image src={CheckedIcon} width={14} height={14} alt="checked" />}
              onChange={handleChange}
            />
          }
          label={
            <Typography variant="body2" minWidth={120}>
              {t('choose_layout_title')}
            </Typography>
          }
        />
      </FormGroup>
    </Stack>
  )
}

export { ChooseTypeLayout }

const Checkbox = styled(MuiCheckbox)({
  padding: 3,
  width: 20,
  height: 20,
  borderRadius: 2,
  color: 'transparent',
  border: `1px solid ${customPrimary[700]}`,
  background: 'white',
  marginRight: 6,
})
