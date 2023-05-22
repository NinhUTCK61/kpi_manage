import { Box, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CommentFormType } from './CommentForm'
import { InputComment } from './InputComment'
import { ButtonSend, CommentReplyContainer } from './styled'
import SendIcon from '/public/assets/svgs/send.svg'

const CommentReplyForm = () => {
  const { t } = useTranslation('file')
  const { data } = useSession()
  const { control, setFocus } = useForm<CommentFormType>({
    defaultValues: {
      content: '',
    },
  })

  useEffect(() => {
    setFocus('content')
  }, [setFocus])

  return (
    <CommentReplyContainer spacing={1} direction="row">
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

        <ButtonSend type="submit">
          <Image src={SendIcon} alt="send" />
        </ButtonSend>
      </Stack>
    </CommentReplyContainer>
  )
}

export { CommentReplyForm }
