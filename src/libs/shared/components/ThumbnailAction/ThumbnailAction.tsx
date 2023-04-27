import { useState } from 'react'
import { DialogThumbnail } from '../Dialog'
import ModalAction from '../Modal/ModalAction'

type ThumbnailActionType = {
  isOpen: boolean
  onClose: () => void
}

const ThumbnailAction: React.FC<ThumbnailActionType> = ({ isOpen, onClose }) => {
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

      <ModalAction image={image || []} isOpen={!!image} onClose={onCloseModal} />
    </>
  )
}

export default ThumbnailAction
