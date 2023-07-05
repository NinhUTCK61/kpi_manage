import { useTemporalStore } from '@/libs/react-flow'
import { Stack } from '@mui/material'
import Image from 'next/image'
import RedoInactive from 'public/assets/svgs/redo.svg'
import RedoActive from 'public/assets/svgs/redo_active.svg'
import UndoInactive from 'public/assets/svgs/undo.svg'
import UndoActive from 'public/assets/svgs/undo_active.svg'
import { FC } from 'react'
import { shallow } from 'zustand/shallow'

const UndoRedo: FC = () => {
  const { undo, redo, pastStates, futureStates } = useTemporalStore((state) => state, shallow)

  const canRedo = futureStates.length > 0
  const canUndo = pastStates.length > 0

  return (
    <Stack direction="row" spacing={2} mr={3}>
      <Image
        src={canUndo ? UndoActive : UndoInactive}
        onClick={() => undo()}
        alt="undo"
        style={{ cursor: canUndo ? 'pointer' : 'auto' }}
      />

      <Image
        src={canRedo ? RedoActive : RedoInactive}
        onClick={() => redo()}
        alt="redo"
        style={{ cursor: canRedo ? 'pointer' : 'auto' }}
      />
    </Stack>
  )
}

export { UndoRedo }
