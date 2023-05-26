import { useEffect } from 'react'
import { useKeyPress } from 'reactflow'
import { useNodeHandler } from '.'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'

const useHandleKeyPress = () => {
  const { data } = useKPINodeContext()
  const setNodeCopy = useRFStore((state) => state.setNodeCopy)
  const { handlePaste } = useNodeHandler()

  const copy = useKeyPress([
    'ControlLeft+KeyC',
    'ControlRight+KeyC',
    'MetaLeft+KeyC',
    'MetaRight+KeyC',
  ])

  const paste = useKeyPress([
    'ControlLeft+KeyV',
    'ControlRight+KeyV',
    'MetaLeft+KeyV',
    'MetaRight+KeyV',
  ])

  useEffect(() => {
    if (!copy) return
    setNodeCopy(data.id)
  }, [copy, data.id, setNodeCopy])

  useEffect(() => {
    if (!paste) return
    handlePaste()
  }, [handlePaste, paste])
}

export { useHandleKeyPress }
