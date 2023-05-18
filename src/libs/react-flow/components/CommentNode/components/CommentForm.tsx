import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import { ButtonSendComment, InputCommentStyle, InputStyle } from './styled'
import SendIcon from '/public/assets/svgs/send.svg'

const CommentForm = () => {
  return (
    <Stack component="form">
      <InputCommentStyle spacing={1} direction="row">
        <Box width={32} height={32} sx={{ background: '#D9D9D9', borderRadius: '100%' }}></Box>
        <Stack component="form" position="relative" width="100%">
          <InputStyle name="comment" />
          <ButtonSendComment type="submit">
            <Image src={SendIcon} alt="send" />
          </ButtonSendComment>
        </Stack>
      </InputCommentStyle>
    </Stack>
  )
}

export { CommentForm }
