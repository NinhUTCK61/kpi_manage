import { InputNode } from '@/libs/shared/components/Form/Input'
import { Stack, Typography, styled, Box } from '@mui/material'
import Image from 'next/image'
import AddIcon from 'public/assets/svgs/add_node.svg'
import NodeIcon from 'public/assets/svgs/node.svg'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Handle, NodeProps, Position } from 'reactflow'
import { useRFStore } from '../hooks'

const handleStyle = {
  top: '50%',
  right: '-30px',
  height: '0px',
  width: '0px',
  minWidth: '0px',
  minHeight: '0px',
}
const handleStyleBottom = {
  bottom: '-30px',
  cursor: 'pointer',
  height: '0px',
  width: '0px',
  minWidth: '0px',
  minHeight: '0px',
}
const handleStyleLeft = {
  top: '50%',
  left: '0px',
  opacity: '0',
  height: '0px',
  width: '0px',
  minWidth: '0px',
  minHeight: '0px',
}

type NodeFormProps = {
  label: string
  unit: string
  formula: string
}

function KpiNode(props: NodeProps) {
  const { data, isConnectable, selected, id } = props
  const { control, getValues } = useForm<NodeFormProps>({
    defaultValues: {
      label: data?.data?.label,
      unit: data?.data?.unit,
      formula: data?.data?.formula,
    },
  })
  const [wasFocus, setWasFocus] = useState<boolean>(false)
  const { addNode, nodes } = useRFStore((state) => state)

  const checkFocus = () => {
    if (!wasFocus) {
      return false
    } else {
      if (selected) {
        return false
      } else {
        return true
      }
    }
  }

  return checkFocus() ? (
    <StackNodeUnActive>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyleLeft}
        isConnectable={isConnectable}
      />
      <Typography variant="body2" fontWeight={600} mb={0.5}>
        {`${getValues('label')}(${getValues('unit')})`}
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {getValues('formula')}{' '}
      </Typography>
      <Handle type="source" position={Position.Right} style={handleStyle}>
        {id !== 'root' && <IconImageNode src={NodeIcon} alt="add" />}
      </Handle>
      <TextId variant="caption">{id}</TextId>
    </StackNodeUnActive>
  ) : (
    <StackNodeActive
      onClick={() => {
        setWasFocus(true)
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyleLeft}
        isConnectable={isConnectable}
      />
      <Stack>
        <InputNode control={control} name="label" placeholder="Label" />
        <InputNode control={control} name="formula" placeholder="=" />
        <InputNode control={control} name="unit" placeholder="Unit" />
      </Stack>
      {id !== 'root' && (
        <Handle
          type="target"
          position={Position.Bottom}
          style={handleStyleBottom}
          onClick={() => addNode(data.parent_node_id)}
        >
          <IconImage src={AddIcon} alt="add" />
        </Handle>
      )}
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
        onClick={() => addNode(data.id)}
      >
        <IconImage src={AddIcon} alt="add" />
      </Handle>
    </StackNodeActive>
  )
}

const TextId = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: theme.palette.blue[0],
  color: theme.palette.blue[500],
  padding: theme.spacing(0.5, 1),
  borderRadius: 4,
}))

const IconImage = styled(Image)({
  transform: 'translate(-50%,-50%)',
  cursor: 'pointer',
})

const IconImageNode = styled(Image)(({ theme }) => ({
  transform: 'translate(-50%,-100%)',
  cursor: 'pointer',
  pointerEvents: 'none',
  background: theme.palette.common.white,
}))

const StackNodeActive = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  maxWidth: 190,
  height: 106,
  padding: 10,
  border: `2px solid ${theme.palette.blue[400]}}`,
  backgroundColor: theme.palette.common.white,
}))

const StackNodeUnActive = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  maxWidth: 190,
  height: 106,
  justifyContent: 'center',
  position: 'relative',
}))

export { KpiNode }
