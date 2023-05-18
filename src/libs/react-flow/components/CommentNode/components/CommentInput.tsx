import { api } from '@/libs/api'
import { convertToReactFlowComment } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { CreateCommentInputSchema, CreateCommentInputType } from '@/libs/schema/comment'
import { Input } from '@/libs/shared/components'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { MenuProps, Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { KeyboardEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useReactFlow } from 'reactflow'
import { ButtonSendComment, Menu } from './styled'
import CommentIcon from '/public/assets/svgs/comment_create.svg'
import SendIcon from '/public/assets/svgs/send.svg'

type CtxMenuProps = MenuProps & {
  containerRef: HTMLDivElement | null
  positionMenu: ContextMenuState
}

const CommentInput: React.FC<CtxMenuProps> = ({
  open,
  onClose,
  anchorPosition,
  containerRef,
  positionMenu,
}) => {
  const router = useRouter()
  const utils = api.useContext()
  const addComment = useRFStore((state) => state.addComment)

  const { id } = router.query
  const { project } = useReactFlow()
  const { top, left } = containerRef?.getBoundingClientRect() ?? { top: 0, left: 0 }

  const position = project({
    x: positionMenu?.mouseX ?? 0 - left,
    y: positionMenu?.mouseY ?? 0 - top,
  })

  const { mutate } = api.comment.create.useMutation()
  const { control, handleSubmit } = useForm<CreateCommentInputType>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(CreateCommentInputSchema),
  })

  const onSubmit: SubmitHandler<CreateCommentInputType> = (data) => {
    const comment = {
      id: nanoid(),
      content: data.content,
      template_id: id as string,
      x: position.x,
      y: position.y - 130,
    }
    mutate(
      {
        ...comment,
      },
      {
        onSuccess(data) {
          const comment = convertToReactFlowComment(data)
          addComment(comment)
        },
        onError(error) {
          console.log(error)
        },
        onSettled() {
          utils.node.list.invalidate()
        },
      },
    )
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const content = (e.target as HTMLInputElement).value
      const comment = {
        id: nanoid(),
        content,
        template_id: id as string,
        x: position.x,
        y: position.y - 130,
      }
      mutate(
        {
          ...comment,
        },
        {
          onSuccess(data) {
            const comment = convertToReactFlowComment(data)
            addComment(comment)
          },
          onError(error) {
            console.log(error)
          },
          onSettled() {
            utils.node.list.invalidate()
          },
        },
      )
    }
  }

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Image src={CommentIcon} alt="comment icon" />
        <Stack
          component="form"
          position="relative"
          width="100%"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <Input
            control={control}
            name="content"
            placeholder="Add to comment"
            sx={(theme) => ({
              padding: '12px 16px',
              height: '48px',
              width: 382,
              ...theme.typography.body2,
              background: theme.palette.trueGrey[100],
              color: theme.palette.base.black,
              borderRadius: 1.5,
              border: 'none',
            })}
          />
          <ButtonSendComment type="submit">
            <Image src={SendIcon} alt="send" />
          </ButtonSendComment>
        </Stack>
      </Stack>
    </Menu>
  )
}

export { CommentInput }
