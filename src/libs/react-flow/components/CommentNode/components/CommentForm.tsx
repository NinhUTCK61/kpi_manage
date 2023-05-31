import { ViewPortAction } from '@/features/node/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { z } from 'zod'
import { useCommentCreateMutation } from '../hooks'
import { InputComment } from './InputComment'
import { ButtonAction, ButtonSendContainer, CommentFormContainer } from './styled'
import CommentIcon from '/public/assets/svgs/comment_icon.svg'
import SendIcon from '/public/assets/svgs/send.svg'

const COMMENT_HEIGHT_CURSOR = 20

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
    y: activePosition ? activePosition.y - top - COMMENT_HEIGHT_CURSOR / 2 : 0,
  })

  const { control, getValues, reset } = useForm<CommentFormType>({
    defaultValues: {
      content: '',
    },
  })

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!getValues().content.trim()) {
      return
    }

    const newComment = {
      id: nanoid(),
      content: getValues().content,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const open = Boolean(activePosition) && viewportAction === ViewPortAction.Comment

  return (
    <CommentFormContainer
      open={open}
      anchorReference="anchorPosition"
      onClose={handleClose}
      anchorPosition={
        activePosition ? { top: activePosition.y, left: activePosition.x } : undefined
      }
      transformOrigin={{
        vertical: COMMENT_HEIGHT_CURSOR,
        horizontal: 'left',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" minHeight={48}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Image src={CommentIcon} alt="comment icon" />
        </Stack>

        <Stack component="form" position="relative" width={382} onSubmit={handleSubmit}>
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

          <ButtonSendContainer>
            <ButtonAction type="submit">
              <Image src={SendIcon} alt="send" />
            </ButtonAction>
          </ButtonSendContainer>
        </Stack>
      </Stack>
    </CommentFormContainer>
  )
}

export { CommentForm }
