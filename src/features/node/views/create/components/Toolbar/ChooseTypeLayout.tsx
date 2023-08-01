import { base, customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const ChooseTypeLayout: React.FC = () => {
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const [checked, setChecked] = useState<boolean>(true)

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleChange = (event: ChangeEvent) => {
    const isCheckbox = (event.target as HTMLInputElement).checked 
    if (!nodeFocusedMemo) return
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

  const handleClick = ()=>{
    if (!nodeFocusedMemo) return
    setChecked(!checked)
  }

  useEffect(()=>{
    if (!nodeFocusedMemo) return
    setChecked(nodeFocusedMemo.data.layout === 'FILL' ? true: false)
    console.log(nodeFocusedMemo.data.layout)
  },[nodeFocusedMemo])

  return (
    <Stack direction="row" alignItems="center" spacing={0.25} padding="0 8px">
      <FormGroup>
        <FormControlLabel
          sx={{
            mx: { xs: 'auto', sm: 0 },
          }}
          control={<Checkbox checked={checked} sx={{ padding: 0 }} onChange={handleChange} onClick={handleClick}/>}
          label={<Typography>Background Fill</Typography>}
        />
      </FormGroup>
    </Stack>
  )
}

export { ChooseTypeLayout }
