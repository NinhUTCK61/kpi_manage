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
  const { t } = useTranslation(['home'])
  const [image, setImage] = useState<File[] | null>()
  const onSelectImage = (_acceptedFiles: File[]) => {
    console.log(_acceptedFiles)
    _acceptedFiles.length
      ? setImage(_acceptedFiles)
      : enqueueSnackbar(t('incorrect_upload_image'), {
          variant: 'error',
        })

    onClose()
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
        idTemplate={idTemplate}
        onOpenDialogThumbnail={onOpen}
      />
    </>
  )
}

export { ThumbnailAction }
