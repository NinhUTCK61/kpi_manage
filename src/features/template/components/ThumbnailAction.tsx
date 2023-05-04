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
  const [image, setImage] = useState<File[] | null>()
  const onSelectImage = (_acceptedFiles: File[]) => {
    setImage(_acceptedFiles)
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
