import { CustomImage } from '@/features/auth/components'
import { Button, CircularProgress, Modal, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { BoxContainer, CloseButton, ImagePreview } from './styled'
import CloseIcon from '/public/assets/svgs/close.svg'

type ModalUploadType = {
  handleCloseUpload: () => void
  title: string
  description: string
  previewURL: string
  nameImage: string
  isLoading: boolean
  handleUploadImage: () => void
  onReturnUpload?: () => void
}

const ModalUpload: React.FC<ModalUploadType> = ({
  handleCloseUpload,
  title,
  description,
  previewURL,
  nameImage,
  isLoading,
  handleUploadImage,
  onReturnUpload,
}) => {
  const { t } = useTranslation('common')

  return (
    <Modal open={!!previewURL} onClose={handleCloseUpload}>
      <BoxContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} fontSize="18px" lineHeight="28px">
            {title}
          </Typography>

          <CloseButton onClick={handleCloseUpload}>
            <CustomImage alt="icon" src={CloseIcon} sx={{ mb: 0 }} />
          </CloseButton>
        </Stack>

        <Typography mt={1} fontSize="14px" fontWeight="20px">
          {description}
        </Typography>

        <Stack direction="row" justifyContent="center" my={3}>
          <ImagePreview>
            {previewURL && (
              <CustomImage
                key={nameImage}
                src={previewURL}
                alt={nameImage}
                width={268}
                height={206}
                style={{ marginBottom: 0, objectFit: 'cover' }}
                onLoad={() => {
                  URL.revokeObjectURL(previewURL)
                }}
              />
            )}
          </ImagePreview>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            fullWidth
            onClick={onReturnUpload ? onReturnUpload : handleCloseUpload}
          >
            {t('modal.cancel')}
          </Button>

          <Button variant="contained" fullWidth onClick={handleUploadImage} disabled={isLoading}>
            {isLoading ? <CircularProgress size="1.2rem" /> : t('modal.ok')}
          </Button>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

export { ModalUpload }
