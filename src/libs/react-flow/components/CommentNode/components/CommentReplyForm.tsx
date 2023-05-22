import { CreateCommentReplyInput } from '@/libs/schema/comment'
import { Box, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import { useForm } from 'react-hook-form'
import { InputComment } from './InputComment'
import { ButtonSendComment, CommentReplyStyled } from './styled'
import SendIcon from '/public/assets/svgs/send.svg'

const CommentReplyForm = () => {
  const { t } = useTranslation('file')
  const { data } = useSession()
  const { control } = useForm<CreateCommentReplyInput>({
    defaultValues: {
      id: '',
      content: '',
    },
  })

  return (
    <CommentReplyStyled spacing={1} direction="row">
      <Box width={32} height={32} borderRadius="100%">
        <Image src={data?.user.image || ImageFile} alt="file" width={32} height={32} />
      </Box>

      <Stack component="form" position="relative" width="100%">
        <InputComment
          autoFocus
          name="content"
          placeholder={t('enter_comment') as string}
          control={control}
          fullWidth
        />

        <ButtonSendComment type="submit">
          <Image src={SendIcon} alt="send" />
        </ButtonSendComment>
      </Stack>
    </CommentReplyStyled>
  )
}

export { CommentReplyForm }
