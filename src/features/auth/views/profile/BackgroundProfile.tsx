import { api } from '@/libs/api'
import { getImageUrl } from '@/libs/utils/misc'
import { Box, styled } from '@mui/material'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import ProfileImage from '/public/assets/imgs/profile.png'
import CameraEdit from '/public/assets/svgs/camera.svg'

type BackgroundProfileType = {
  onDrop: (file: File[]) => void
}

export const BackgroundProfile: React.FC<BackgroundProfileType> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    multiple: false,
  })

  const { data } = api.profile.me.useQuery()

  return (
    <Box {...getRootProps({ className: 'dropzone' })} mb={2} width={100}>
      <input {...getInputProps()} />

      <AvatarWhenEit>
        <CustomImage
          src={data?.image ? getImageUrl(data.image) : ProfileImage}
          alt="avatar"
          width={100}
          height={100}
        />

        <Camera>
          <Image src={CameraEdit} width={20} height={20} alt="choose avatar" />
        </Camera>
      </AvatarWhenEit>
    </Box>
  )
}

const CustomImage = styled(Image)({
  borderRadius: '100%',
  objectFit: 'cover',
})

const AvatarWhenEit = styled(Box)({
  position: 'relative',
  width: 100,
  height: 100,
})

const Camera = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: '100%',
  background: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
