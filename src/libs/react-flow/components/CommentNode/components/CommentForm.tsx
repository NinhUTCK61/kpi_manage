import { CreateCommentInputSchema, CreateCommentInputType } from '@/libs/schema/comment'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { MenuProps, Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { KeyboardEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { useCommentCreateMutation } from '../hooks'
import { InputComment } from './InputComment'
import { ButtonSendComment, Menu } from './styled'
import CommentIcon from '/public/assets/svgs/comment_create.svg'
import SendIcon from '/public/assets/svgs/send.svg'

type CommentFormProps = MenuProps & {
  containerRef: HTMLDivElement | null
  positionMenu: ContextMenuState
  handleClose: () => void
}

const CommentForm: React.FC<CommentFormProps> = ({
  open,
  onClose,
  anchorPosition,
  containerRef,
  positionMenu,
  handleClose,
}) => {
  const router = useRouter()
  const { id } = router.query
  const { project } = useReactFlow()
  const { mutate: create } = useCommentCreateMutation()
  const { top } = containerRef?.getBoundingClientRect() ?? { top: 120 }
  const { t } = useTranslation('file')

  const position = project({
    x: positionMenu?.mouseX as number,
    y: (positionMenu?.mouseY as number) - top,
  })

  const { control, handleSubmit, reset } = useForm<CreateCommentInputType>({
    defaultValues: {
      id: '',
      content: '',
      template_id: '',
      x: 0,
      y: 0,
    },
    resolver: zodResolver(CreateCommentInputSchema),
  })

  const createComment = (content: string) => {
    const newComment = {
      id: nanoid(),
      template_id: id as string,
      x: position.x,
      y: position.y,
      content,
    }

    create(newComment, {
      onSuccess() {
        handleClose()
        reset({ content: '' })
      },
    })
  }

  const onSubmit: SubmitHandler<CreateCommentInputType> = (data) => {
    createComment(data.content)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const content = (e.target as HTMLInputElement).value
      if (content.length === 0) return

      createComment(content)
    }
  }

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Image src={CommentIcon} alt="comment icon" />

        <Stack
          component="form"
          position="relative"
          width={382}
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <InputComment
            control={control}
            name="content"
            placeholder={t('enter_comment') as string}
            fullWidth
          />

          <ButtonSendComment type="submit">
            <Image src={SendIcon} alt="send" />
          </ButtonSendComment>
        </Stack>
      </Stack>
    </Menu>
  )
}

export { CommentForm }
