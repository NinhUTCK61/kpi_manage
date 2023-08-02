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
import { LayoutType } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CheckedIcon from 'public/assets/svgs/checked_layout.svg'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const ChooseTypeLayout: React.FC = () => {
  const { t } = useTranslation('file')
  const [type, setType] = useState<LayoutType>('FILL')

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleChange = (event: ChangeEvent) => {
    const isCheckbox = (event.target as HTMLInputElement).checked
    const value = isCheckbox ? 'FILL' : 'STROKE'

    setType(value)

    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const isTextColorValid =
      nodeStyle.color !== base.white && nodeStyle.color !== customPrimary[700]
    const defaultColor = value === 'FILL' ? base.white : customPrimary[700]
    const textColor = isTextColorValid ? nodeStyle.color : defaultColor
    const newNodeStyle = JSON.stringify({ ...nodeStyle, color: textColor })

    updateReactFlowNode(
      {
        layout: value,
        id: nodeFocusedMemo.data.id,
        is_saved: nodeFocusedMemo.data.is_saved,
        node_style: newNodeStyle,
      },
      'speech_ballon',
    )
  }

  useEffect(() => {
    if (!nodeFocusedMemo) return
    const layoutType = nodeFocusedMemo.data.layout
    layoutType ? setType(layoutType) : setType('FILL')
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
              checked={type === 'FILL'}
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
