import { BackgroundDefault } from '@/libs/react-flow/components/CommentNode/components/styled'
import { Box, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import ImageProfile from 'public/assets/imgs/profile.png'
import { useDropzone } from 'react-dropzone'

type BackgroundProfileType = {
  edit: boolean
}

export const BackgroundProfile: React.FC<BackgroundProfileType> = ({ edit }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    multiple: false,
  })

  const { data } = useSession()

  const AvatarUser = () => {
    return data?.user.image ? (
      <Image src={data?.user.image} alt="file" width={32} height={32} />
    ) : (
      <BackgroundDefault width={100} height={100} justifyContent="center" alignItems="center">
        <Typography variant="h1">{data?.user.name?.split('')[0]}</Typography>
      </BackgroundDefault>
    )
  }

  return (
    <>
      {edit ? (
        <Box {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Image src={ImageProfile} width={100} height={100} alt="image profile" />
        </Box>
      ) : (
        <AvatarUser />
      )}
    </>
  )
}
