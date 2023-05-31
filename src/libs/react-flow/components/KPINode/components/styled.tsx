import { base, greyScale, red, second } from '@/libs/config/theme'
import {
  Box,
  List as MuiList,
  ListItem as MuiListItem,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Paper as MuiPaper,
  Stack,
  SvgIcon,
  SvgIconProps,
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
  maxWidth: 190,
  // height: 130,
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  transform: 'translate(0%, -50%)',
  borderRadius: 12,
}))

const NodeInActiveContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  maxWidth: 190,
  minHeight: 112,
  justifyContent: 'center',
  position: 'relative',
  padding: theme.spacing(0.5),
  cursor: 'pointer !important',
  transform: 'translate(0%,-50%)',
}))

const TextOverflow = styled(Typography)({
  maxWidth: 125,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Menu = styled(MuiMenu)(({ theme }) => ({
  '.MuiMenu-paper': {
    boxShadow: theme.shadows[3],
  },
}))

const MenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) => prop !== 'isDelete',
})<{ isDelete?: boolean }>(({ theme, isDelete }) => {
  return {
    width: 240,
    height: theme.spacing(6.75),
    lineHeight: '22px',
    fontSize: 15,
    fontWeight: 400,
    ':hover': {
      backgroundColor: theme.palette.customPrimary[0],
    },
    color: isDelete ? red[500] : base.black,
    '&.Mui-disabled': {
      color: greyScale[500],
    },
  }
})

const StackError = styled(Stack)({
  position: 'absolute',
  top: -6,
  left: 0,
  transform: 'translate(0%,-100%)',
})

function NodeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" strokeWidth="2" />
      </svg>
    </SvgIcon>
  )
}

const Paper = styled(MuiPaper)({
  borderRadius: 12,
  position: 'absolute',
  bottom: -45,
  transform: 'translate(-25%,100%)',
})

const List = styled(MuiList)(({ theme }) => ({
  maxHeight: 270,
  zIndex: 2,
  overflow: 'auto',
  borderRadius: 12,
  background: theme.palette.common.white,
  scrollBehavior: 'smooth',
}))

const IconTop = styled(Stack)({
  position: 'absolute',
  top: 5,
  left: '5%',
  transform: 'translateY(-50%)',
  width: 24,
  height: 24,
  background: second[0],
  borderRadius: '40px',
})

const ListItem = styled(MuiListItem)<{ active: string }>(({ theme, active }) => ({
  ...(active === 'true' && {
    background: theme.palette.customPrimary[0],
  }),
  width: 262,
  '&:hover': {
    background: theme.palette.greyScale[100],
  },
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
  StackError,
  NodeIcon,
  Paper,
  List,
  ListItem,
  IconTop,
}
