import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { DialogThumbnail } from '../../../libs/shared/components/Dialog'
import { ModalUploadImage } from './ModalUploadImage'
type ThumbnailActionTypes = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  idTemplate: string
}

const ThumbnailAction: React.FC<ThumbnailActionTypes> = ({
  isOpen,
  onClose,
  onOpen,
  idTemplate,
}) => {
  const { t } = useTranslation('home')
  const [image, setImage] = useState<File[] | null>()
  const onSelectImage = (_acceptedFiles: File[]) => {
    if (handleValidateFormatImage(_acceptedFiles)) {
      setImage(_acceptedFiles), onClose()
    } else {
      onCloseModal()
    }
  }

  function handleValidateFormatImage(_acceptedFiles: File[]) {
    if (!_acceptedFiles.length) {
      enqueueSnackbar(t('incorrect_upload_image'), {
        variant: 'error',
      })
      return false
    }
    if (_acceptedFiles[0]?.size && Math.floor(_acceptedFiles[0]?.size / (1024 * 1024)) > 3) {
      enqueueSnackbar(t('error_size_image_upload'), {
        variant: 'error',
      })
      return false
    }
    return true
  }
  const onCloseModal = () => {
    setImage(null)
  }

  return (
    <>
      <DialogThumbnail onDrop={onSelectImage} open={isOpen} handleClose={onClose} />

      <ModalUploadImage
        image={image || []}
        isOpen={!!image}
        onCloseModalUploadImage={onCloseModal}
        onCloseDialogThumbnail={onClose}
        idTemplate={idTemplate}
        onOpenDialogThumbnail={onOpen}
      />
    </>
  )
}

export { ThumbnailAction }
