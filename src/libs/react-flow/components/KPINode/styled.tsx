import { Box, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { Handle } from 'reactflow'

export const LeftHandler = styled(Handle)({
  '&.react-flow__handle-left': {
    top: '50%',
    left: 0,
    opacity: 0,
    height: 0,
    width: 0,
    minWidth: 0,
    minHeight: 0,
  },
})

export const BottomHandler = styled(Handle)({
  '&.react-flow__handle-bottom': {
    bottom: -20,
    cursor: 'pointer',
    height: 0,
    width: 0,
    minWidth: 0,
    minHeight: 0,
  },
})

export const RightHandler = styled(Handle)({
  '&.react-flow__handle-right': {
    top: '50%',
    right: -20,
    height: 0,
    width: 0,
    minWidth: 0,
    minHeight: 0,
  },
})

export const TextId = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: theme.palette.blue[0],
  color: theme.palette.blue[500],
  padding: theme.spacing(0.5, 1),
  borderRadius: 4,
}))

export const IconImage = styled(Image)({
  transform: 'translate(-50%,-50%)',
  cursor: 'pointer',
})

export const IconImageNode = styled(Image)(({ theme }) => ({
  transform: 'translate(-50%,-100%)',
  cursor: 'pointer',
  pointerEvents: 'none',
  background: theme.palette.common.white,
}))

export const StackNodeActive = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  maxWidth: 190,
  height: 106,
  padding: 10,
  border: `2px solid ${theme.palette.blue[400]}}`,
  backgroundColor: theme.palette.common.white,
}))

export const NodeUnActiveContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  maxWidth: 190,
  height: 106,
  justifyContent: 'center',
  position: 'relative',
  width: 190,
}))
