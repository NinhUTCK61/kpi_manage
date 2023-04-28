import { useState } from 'react'
import { DialogThumbnail } from '../Dialog'
import { ModalUploadImage } from '../Modal/ModalUploadImage'

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
        onClose={onCloseModal}
        idTemplate={idTemplate}
        onOpen={onOpen}
      />
    </>
  )
}

export default ThumbnailAction
