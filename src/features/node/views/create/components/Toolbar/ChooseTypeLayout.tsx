import { base, customPrimary } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { InputStyled, MenuItem } from '@/libs/shared/components'
import { Select as MuiSelect, SelectChangeEvent, Stack, Typography, styled } from '@mui/material'
import { LayoutType } from '@prisma/client'
import Image from 'next/image'
import ArrowDown from 'public/assets/svgs/arrow_down.svg'
import { useEffect, useMemo, useState } from 'react'
import { useNodeUpdateHandler } from '../../../hooks'

const shapes = [
  { value: '1', type: LayoutType.FILL, label: 'Fill' },
  { value: '2', type: LayoutType.STROKE, label: 'Stroke' },
]

const ChooseTypeLayout: React.FC = () => {
  const [type, setType] = useState<LayoutType>('FILL')

  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const nodeFocusedMemo = useMemo(() => {
    if (!nodeFocused || nodeFocused.type !== 'speech_ballon') return
    return nodeFocused
  }, [nodeFocused])

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const handleChange = (value: LayoutType) => {
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
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Select
        value={type}
        onChange={(event: SelectChangeEvent<unknown>) =>
          handleChange(event.target.value as LayoutType)
        }
        input={<CustomInput />}
        IconComponent={(props) => <Image src={ArrowDown} alt="arrow" {...props} />}
        defaultValue={type}
      >
        {shapes.map((item) => (
          <MenuItem
            key={item.value}
            value={item.type}
            sx={{ padding: '8px 12px' }}
            autoFocus={item.type === 'FILL'}
          >
            <Typography variant="body2" color="base.black">
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}

const Select = styled(MuiSelect)(({ theme }) => ({
  border: `1px solid ${theme.palette.greyScale[400]}`,
  paddingRight: 8,
  marginRight: 12,
  height: 32,
  minWidth: 99,
  background: theme.palette.common.white,
  '& .MuiSelect-icon': {
    top: 'auto',
  },
}))

const CustomInput = styled(InputStyled)({
  '& fieldset': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    display: 'flex',
  },
})

export { ChooseTypeLayout }
