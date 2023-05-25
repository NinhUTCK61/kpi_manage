import { useNodeUpdateMutation, useRFStore } from '@/libs/react-flow'
import { MenuItem } from '@/libs/shared/components'
import { InputBase, Select as MuiSelect, SelectChangeEvent, styled } from '@mui/material'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down_select.svg'
import { useEffect, useMemo, useState } from 'react'

const fontSizes = [
  {
    label: '12px',
    value: '12px',
  },
  {
    label: '13px',
    value: '13px',
  },
  {
    label: '14px',
    value: '14px',
  },
  {
    label: '15px',
    value: '15px',
  },
  {
    label: '16px',
    value: '16px',
  },
  {
    label: '17px',
    value: '17px',
  },
  {
    label: '18px',
    value: '18px',
  },
]

const DEFAULT_FONT_SIZE = '15px'

const ChooseFontSize: React.FC = () => {
  const [fontSize, setFontSize] = useState<string>(DEFAULT_FONT_SIZE)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const updateNode = useRFStore((state) => state.updateKPINode)
  const { mutate: update } = useNodeUpdateMutation()

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'kpi') return

    return nodeFocused
  }, [nodeFocused])

  useEffect(() => {
    if (!nodeFocusedMemo) {
      setFontSize(DEFAULT_FONT_SIZE)
      return
    }
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    setFontSize(nodeStyle.fontSize ? nodeStyle.fontSize : DEFAULT_FONT_SIZE)
  }, [nodeFocusedMemo])

  const handleFontSizeChange = (event: SelectChangeEvent<unknown>) => {
    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    const oldValue = fontSize
    const value = event.target.value as string
    setFontSize(value)

    const newNodeStyle = JSON.stringify({ ...nodeStyle, fontSize: value })

    // Case the node has not been saved to the database
    if (!nodeFocusedMemo.data.is_saved) {
      updateNode({ ...nodeFocusedMemo.data, node_style: newNodeStyle })
      return
    }

    update(
      {
        id: nodeFocusedMemo.id,
        node_style: newNodeStyle,
      },
      {
        onError() {
          setFontSize(oldValue)
        },
      },
    )
  }

  return (
    <Select
      value={fontSize}
      onChange={handleFontSizeChange}
      input={<CustomInput />}
      IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
    >
      {fontSizes.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )
}

const Select = styled(MuiSelect)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  paddingRight: 8,
  marginRight: 12,
  background: theme.palette.common.white,
  '& .MuiSelect-icon': {
    top: 'auto',
  },
}))

const CustomInput = styled(InputBase)(({ theme }) => ({
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.base.black,
  paddingLeft: 12,
  border: `1px solid ${theme.palette.greyScale[400]}`,
  borderRadius: 4,
  gap: 8,
  height: 34,
}))

export { ChooseFontSize }
