import { CommentOutputType, CreateCommentOutputType } from '@/libs/schema/comment'
import { Box, Stack, Typography } from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import MenuIcon from 'public/assets/svgs/more.svg'
import { ButtonAction } from './styled'

type CommentItemProps = {
  data: CreateCommentOutputType | CommentOutputType
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const {
    i18n: { language },
  } = useTranslation('home')
  const { data: session } = useSession()

  return (
    <Stack sx={{ padding: 2 }}>
      <Stack flexDirection="row" justifyContent="space-between" mb={1}>
        <Stack flexDirection="row">
          <Box mr={1} width={24} height={24} borderRadius="100%">
            <Image src={data.author.image || ImageFile} alt="file" width={24} height={24} />
          </Box>

          <Typography variant="body2" color={(theme) => theme.palette.base.black} fontWeight={600}>
            {data.author.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography
            variant="caption"
            fontWeight={400}
            color={(theme) => theme.palette.greyScale[500]}
          >
            {formatDistance(data.created_at, new Date(), {
              addSuffix: true,
              locale: language === 'en' ? enAU : ja,
            })}
          </Typography>

          {session?.user.id === data.author_id && (
            <ButtonAction>
              <Image src={MenuIcon} alt="menu icon" />
            </ButtonAction>
          )}
        </Stack>
      </Stack>

      <Typography variant="body2" color={(theme) => theme.palette.greyScale[900]}>
        {data.content}
      </Typography>
    </Stack>
  )
}

export { CommentItem }
