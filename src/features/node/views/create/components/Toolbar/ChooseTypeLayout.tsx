import { base, customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material'
import { ChangeEvent, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const ChooseTypeLayout: React.FC = () => {
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const [checked, setChecked] = useState<boolean>(nodeFocusedMemo?.data.layout === 'FILL')

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleChange = (_: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked)

    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const isTextColorValid =
      nodeStyle.color !== base.white && nodeStyle.color !== customPrimary[700]
    const defaultColor = checked ? base.white : customPrimary[700]
    const textColor = isTextColorValid ? nodeStyle.color : defaultColor
    const newNodeStyle = JSON.stringify({ ...nodeStyle, color: textColor })

    updateReactFlowNode(
      {
        layout: checked ? 'FILL' : 'STROKE',
        id: nodeFocusedMemo.data.id,
        is_saved: nodeFocusedMemo.data.is_saved,
        node_style: newNodeStyle,
      },
      'speech_ballon',
    )
    console.log(checked)
  }

  const isChecked = nodeFocusedMemo && nodeFocusedMemo.data.layout === 'FILL' ? true : false

  return (
    <Stack direction="row" alignItems="center" spacing={0.25} padding="0 8px">
      <FormGroup>
        <FormControlLabel
          sx={{
            mx: { xs: 'auto', sm: 0 },
          }}
          control={<Checkbox checked={isChecked} sx={{ padding: 0 }} onChange={handleChange} />}
          label={<Typography>Background Fill</Typography>}
        />
      </FormGroup>
    </Stack>
  )
}

export { ChooseTypeLayout }
