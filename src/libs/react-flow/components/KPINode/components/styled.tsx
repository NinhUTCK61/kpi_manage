import {
  Box,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Image from 'next/image'
import { Handle } from 'reactflow'

const LeftHandler = styled(Handle)({
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

const BottomHandler = styled(Handle)({
  '&.react-flow__handle-bottom': {
    bottom: -20,
    cursor: 'pointer',
    height: 0,
    width: 0,
    minWidth: 0,
    minHeight: 0,
  },
})

const RightHandler = styled(Handle)({
  '&.react-flow__handle-right': {
    top: '50%',
    right: -20,
    height: 0,
    width: 0,
    minWidth: 0,
    minHeight: 0,
  },
})

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

const NodeActiveContainer = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  maxWidth: 190,
  height: 106,
  padding: theme.spacing(2, 2.25),
  border: `2px solid`,
  backgroundColor: theme.palette.common.white,
  borderColor: theme.palette.blue[500],
}))

const NodeInActiveContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  maxWidth: 190,
  height: 106,
  justifyContent: 'center',
  position: 'relative',
  padding: theme.spacing(0.5),
  cursor: 'pointer !important',
}))

const TextOverflow = styled(Typography)({
  maxWidth: 125,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Menu = styled(MuiMenu)(({ theme }) => ({
  '.MuiMenu-paper': {
    overflow: 'hidden',
    boxShadow: theme.shadows[3],
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
  '.MuiList-root': {
    paddingBottom: 0,
    paddingTop: 0,
  },
}))

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  height: theme.spacing(6.75),
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.common.black,
  ':hover': {
    backgroundColor: theme.palette.customPrimary[0],
  },
}))

const MenuItemDelete = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.red[400],
}))

const MenuItemPaste = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.greyScale[500],
}))

export {
  LeftHandler,
  BottomHandler,
  RightHandler,
  TextId,
  IconImage,
  IconImageNode,
  NodeActiveContainer,
  NodeInActiveContainer,
  TextOverflow,
  Menu,
  MenuItem,
  MenuItemDelete,
  MenuItemPaste,
}
