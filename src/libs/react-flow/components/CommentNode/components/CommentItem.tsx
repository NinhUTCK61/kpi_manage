import { CommentOutputType, CreateCommentOutputType } from '@/libs/schema/comment'
import { Box, Button, ClickAwayListener, Stack, Tooltip, Typography } from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useState } from 'react'

type CommentItemProps = {
  data: CreateCommentOutputType | CommentOutputType
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const {
    i18n: { language },
  } = useTranslation('home')
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <Stack sx={{ padding: 2 }}>
      <Stack flexDirection="row" justifyContent="space-between" mb={1}>
        <Stack flexDirection="row">
          <Box mr={1} width={24} height={24} sx={{ background: 'base.gray', borderRadius: '100%' }}>
            <Image src={data.author.image || ImageFile} alt="file" width={24} height={24} />
          </Box>

          <Typography variant="body2" color="base.black" fontWeight={600}>
            {data.author.name}
          </Typography>
        </Stack>
        <Stack flexDirection="row">
          <Typography variant="caption" fontWeight={400} color="grayScale[500]">
            {formatDistance(data.created_at, new Date(), {
              addSuffix: true,
              locale: language === 'en' ? enAU : ja,
            })}
          </Typography>

          {session?.user.id === data.author_id && (
            <Box ml={1}>
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  sx={{ cursor: 'pointer' }}
                  title="Menu"
                >
                  <Button onClick={handleTooltipOpen}>
                    <Image src={MenuIcon} alt="menu icon" />
                  </Button>
                </Tooltip>
              </ClickAwayListener>
            </Box>
          )}
        </Stack>
      </Stack>
      <Box>
        <Typography variant="body2" color="greyScale[900]">
          {data.content}
        </Typography>
      </Box>
    </Stack>
  )
}

export { CommentItem }
