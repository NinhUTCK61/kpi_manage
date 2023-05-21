import { Box, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import { ButtonSendComment, InputCommentStyle, InputStyle } from './styled'
import SendIcon from '/public/assets/svgs/send.svg'

const CommentForm = () => {
  const { t } = useTranslation('file')
  const { data } = useSession()

  return (
    <InputCommentStyle spacing={1} direction="row">
      <Box width={32} height={32} sx={{ background: '#D9D9D9', borderRadius: '100%' }}>
        <Image src={data?.user.image || ImageFile} alt="file" width={32} height={32} />
      </Box>

      <Stack component="form" position="relative" width="100%">
        <InputStyle name="comment" placeholder={t('enter_comment') as string} />

        <ButtonSendComment type="submit">
          <Image src={SendIcon} alt="send" />
        </ButtonSendComment>
      </Stack>
    </InputCommentStyle>
  )
}

export { CommentForm }
