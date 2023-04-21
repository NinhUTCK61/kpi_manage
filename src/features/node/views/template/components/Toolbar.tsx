import { Stack, styled, Typography } from '@mui/material'
import Image from 'next/image'
import ChatIcon from 'public/assets/svgs/chat.svg'
import ConsulationIcon from 'public/assets/svgs/consulation_toolbar.svg'
import HandIcon from 'public/assets/svgs/hand.svg'
import MoveIcon from 'public/assets/svgs/move_tools.svg'

const Toolbar: React.FC = () => {
  return (
    <Container>
      <Typography>template</Typography>
      <Stack spacing={2.5} direction="row">
        <Image alt="move" src={MoveIcon} />
        <Image alt="move" src={HandIcon} />
        <Image alt="move" src={ConsulationIcon} />
        <Image alt="move" src={ChatIcon} /> 
      </Stack>
    </Container>
  )
}

const Container = styled(Stack)(({ theme }) => ({
  height: 60,
  backgroundColor: theme.palette.greyScale[100],
  padding: theme.spacing(2.5),
  flexDirection: 'row',
  alginItems: 'center',
  justifyContent: 'space-between',
}))

export { Toolbar }
