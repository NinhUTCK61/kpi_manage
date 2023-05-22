import { CreateCommentInputType } from '@/libs/schema/comment'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { MenuProps, Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { useCommentCreateMutation } from '../hooks'
import { InputComment } from './InputComment'
import { ButtonSendComment, CommentFormStyled } from './styled'
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

  console.log(top)

  const { control, handleSubmit, reset } = useForm<CreateCommentInputType>({
    defaultValues: {
      content: '',
    },
  })

  const onSubmit: SubmitHandler<CreateCommentInputType> = (data, e) => {
    e?.preventDefault()

    const createComment = (content: string) => {
      const newComment = {
        id: nanoid(),
        content,
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

    createComment(data.content)
  }

  return (
    <CommentFormStyled
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
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

          <ButtonSendComment type="submit">
            <Image src={SendIcon} alt="send" />
          </ButtonSendComment>
        </Stack>
      </Stack>
    </CommentFormStyled>
  )
}

export { CommentForm }
