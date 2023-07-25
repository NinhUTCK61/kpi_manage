import { getImageUrl } from '@/libs/utils/misc'
import { Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { FormEvent, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useCommentReplyCreateMutation } from '../hooks'
import { CommentFormType } from './CommentForm'
import { InputComment } from './InputComment'
import { ButtonAction, ButtonSendContainer, CommentReplyContainer } from './styled'
import AvatarDefault from '/public/assets/svgs/avatar_default.svg'
import SendIcon from '/public/assets/svgs/send.svg'

type CommentReplyFormProps = {
  commentId: string
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({ commentId }) => {
  const { t } = useTranslation('file')
  const { mutate: createReply } = useCommentReplyCreateMutation()
  const { data } = useSession()
  const scrollRef = useRef<HTMLDivElement>(null)
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
        scrollRef.current?.scrollIntoView(false)
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
    <CommentReplyContainer
      spacing={1}
      justifyContent="space-between"
      direction="row"
      ref={scrollRef}
    >
      <Stack width={32} height={48} borderRadius="100%" direction="row" alignItems="center">
        <Image
          src={data?.user.image ? getImageUrl(data?.user.image) : AvatarDefault}
          alt="file"
          width={32}
          height={32}
          style={{ borderRadius: '100%' }}
        />
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
