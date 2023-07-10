import { useEventListener } from 'usehooks-ts'
import { useNodeHandler } from '.'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'

const useHandleKeyPress = () => {
  const { data } = useKPINodeContext()
  const setNodeCopy = useRFStore((state) => state.setNodeCopy)
  const { handlePaste } = useNodeHandler()

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      setNodeCopy(data.id)
    }

    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      handlePaste()
    }
  }

  useEventListener('keydown', (e) => handleKeydown(e))
}

export { useHandleKeyPress }
