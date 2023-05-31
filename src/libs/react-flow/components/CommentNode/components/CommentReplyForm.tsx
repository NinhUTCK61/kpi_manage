import { Stack, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCommentReplyCreateMutation } from '../hooks'
import { CommentFormType } from './CommentForm'
import { InputComment } from './InputComment'
import {
  BackgroundDefault,
  ButtonAction,
  ButtonSendContainer,
  CommentReplyContainer,
} from './styled'
import SendIcon from '/public/assets/svgs/send.svg'

type CommentReplyFormProps = {
  commentId: string
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({ commentId }) => {
  const { t } = useTranslation('file')
  const { mutate: createReply } = useCommentReplyCreateMutation()
  const { data } = useSession()
  const { control, setFocus, reset, getValues } = useForm<CommentFormType>({
    defaultValues: {
      content: '',
    },
  })

  useEffect(() => {
    setFocus('content')
  }, [setFocus])

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!getValues().content.trim()) {
      return
    }

    const newCommentReply = {
      id: nanoid(),
      content: getValues().content,
      comment_id: commentId,
    }

    createReply(newCommentReply, {
      onSuccess() {
        reset({ content: '' })
      },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <CommentReplyContainer spacing={1} justifyContent="space-between" direction="row">
      <Stack width={32} height={48} borderRadius="100%" direction="row" alignItems="center">
        {data?.user.image ? (
          <Image src={data?.user.image} alt="file" width={32} height={32} />
        ) : (
          <BackgroundDefault width={32} height={32} justifyContent="center" alignItems="center">
            <Typography variant="body1">{data?.user.name?.split('')[0]}</Typography>
          </BackgroundDefault>
        )}
      </Stack>

      <Stack component="form" position="relative" width="100%" onSubmit={handleSubmit}>
        <InputComment
          autoFocus
          name="content"
          placeholder={t('enter_comment') as string}
          onKeyDown={handleKeyDown}
          control={control}
          fullWidth
          multiline
          maxRows={10}
        />

        <ButtonSendContainer direction="row" alignItems="center">
          <ButtonAction type="submit">
            <Image src={SendIcon} alt="send" />
          </ButtonAction>
        </ButtonSendContainer>
      </Stack>
    </CommentReplyContainer>
  )
}

export { CommentReplyForm }
