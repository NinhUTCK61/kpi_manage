import { Box, Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCommentRepliesCreateMutation } from '../hooks'
import { CommentFormType } from './CommentForm'
import { InputComment } from './InputComment'
import { ButtonSend, CommentReplyContainer } from './styled'
import ImageFile from '/public/assets/imgs/file.png'
import SendIcon from '/public/assets/svgs/send.svg'

type CommentReplyFormProps = {
  commentId: string
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({ commentId }) => {
  const { t } = useTranslation('file')
  const { mutate: create } = useCommentRepliesCreateMutation()
  const { data } = useSession()
  const { control, setFocus, reset, handleSubmit } = useForm<CommentFormType>({
    defaultValues: {
      content: '',
    },
  })

  useEffect(() => {
    setFocus('content')
  }, [setFocus])

  const onSubmit: SubmitHandler<CommentFormType> = (data, e) => {
    e?.preventDefault()

    if (!data.content) {
      return
    }

    const newComment = {
      id: nanoid(),
      content: data.content,
      comment_id: commentId,
    }

    create(newComment, {
      onSuccess() {
        reset({ content: '' })
      },
    })
  }

  return (
    <CommentReplyContainer spacing={1} direction="row">
      <Box width={32} height={32} borderRadius="100%">
        <Image src={data?.user.image || ImageFile} alt="file" width={32} height={32} />
      </Box>

      <Stack component="form" position="relative" width="100%" onSubmit={handleSubmit(onSubmit)}>
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
