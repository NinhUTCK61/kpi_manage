import { useValidateImage } from '@/libs/hooks'
import { DialogThumbnail } from '@/libs/shared'
import { useState } from 'react'
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
  const [image, setImage] = useState<File[] | null>()
  const { handleValidateFormatImage } = useValidateImage()

  const onSelectImage = (_acceptedFiles: File[]) => {
    if (handleValidateFormatImage(_acceptedFiles)) {
      setImage(_acceptedFiles), onClose()
    } else {
      onCloseModal()
    }
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
