import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { z } from 'zod'
import { useCommentCreateMutation } from '../hooks'
import { InputComment } from './InputComment'
import { ButtonSend, CommentFormContainer } from './styled'
import CommentIcon from '/public/assets/svgs/comment_create.svg'
import SendIcon from '/public/assets/svgs/send.svg'

export const CommentFormSchema = z.object({
  content: z.string().min(1),
})

export type CommentFormType = z.infer<typeof CommentFormSchema>

const CommentForm: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { project } = useReactFlow()
  const { mutate: create } = useCommentCreateMutation()
  const { t } = useTranslation('file')

  const viewportAction = useRFStore((state) => state.viewportAction)
  const setActivePosition = useRFStore((state) => state.setActivePosition)
  const activePosition = useRFStore((state) => state.activePosition)
  const container = useRFStore((state) => state.container)

  const { top } = container?.getBoundingClientRect() ?? { top: 120 }

  const handleClose = () => {
    reset({ content: '' })
    setActivePosition(null)
  }

  const position = project({
    x: activePosition ? (activePosition.x as number) : 0,
    y: activePosition ? activePosition.y - top : 0,
  })

  const { control, handleSubmit, reset } = useForm<CommentFormType>({
    defaultValues: {
      content: '',
    },
  })

  const onSubmit: SubmitHandler<CommentFormType> = (data, e) => {
    e?.preventDefault()

    if (!data.content) {
      handleClose()
      return
    }

    const newComment = {
      id: nanoid(),
      content: data.content,
      template_id: id as string,
      x: position.x,
      y: position.y,
    }

    create(newComment, {
      onSuccess() {
        handleClose()
        reset({ content: '' })
      },
    })
  }

  const open = Boolean(activePosition) && viewportAction === ViewPortAction.Comment

  return (
    <CommentFormContainer
      open={open}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        activePosition ? { top: activePosition.y - 14, left: activePosition.x } : undefined
      }
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Image src={CommentIcon} alt="comment icon" />

        <Stack component="form" position="relative" width={382} onSubmit={handleSubmit(onSubmit)}>
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
      </Stack>
    </CommentFormContainer>
  )
}

export { CommentForm }
