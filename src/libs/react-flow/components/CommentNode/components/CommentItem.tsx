import { Box, Stack, Typography } from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useCommentNodeContext } from '../context'
import { MenuComment } from './styled'

const CommentItem = () => {
  const {
    i18n: { language },
  } = useTranslation('home')
  const { data } = useCommentNodeContext()
  const { data: session } = useSession()
  return (
    <Stack sx={{ padding: 2 }}>
      <Stack flexDirection="row" justifyContent="space-between" mb={1}>
        <Stack flexDirection="row">
          <Box mr={1} width={24} height={24} sx={{ background: '#D9D9D9', borderRadius: '100%' }}>
            <Image src={data.author.image || ImageFile} alt="file" width={24} height={24} />
          </Box>
          <Typography variant="body2" fontWeight={600}>
            {data.author.name}
          </Typography>
        </Stack>
        <Stack flexDirection="row">
          <Typography variant="caption" fontWeight={400} color="#A0A0A0">
            {formatDistance(data.created_at, new Date(), {
              addSuffix: true,
              locale: language === 'en' ? enAU : ja,
            })}
          </Typography>
          {session?.user.id === data.author_id && (
            <Box ml={1}>
              <Image src={MenuIcon} alt="menu icon" />
              <MenuComment>
                <Typography variant="body2">Edit</Typography>
              </MenuComment>
            </Box>
          )}
        </Stack>
      </Stack>
      <Box>
        <Typography variant="body2" color="#292929">
          {data.content}
        </Typography>
      </Box>
    </Stack>
  )
}

export { CommentItem }
