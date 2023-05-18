import { Stack } from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { NodeProps } from 'reactflow'
import { useOnClickOutside } from 'usehooks-ts'
import { CommentNodeType } from '../../types'
import { Active } from './components/Active'
import { InActive } from './components/InActive'
import { CommentNodeProvider } from './context'

const CommentNode = (props: NodeProps<CommentNodeType>) => {
  const { data } = props
  const contextValue = useMemo(() => ({ data }), [data])
  const [isActive, setIsActive] = useState<boolean>(false)
  const ref = useRef(null)

  const handleClose = () => {
    setIsActive(false)
  }
  useOnClickOutside(ref, handleClose)

  return (
    <CommentNodeProvider value={contextValue}>
      <Stack ref={ref} onClick={() => setIsActive(true)}>
        {isActive ? <Active /> : <InActive />}
      </Stack>
    </CommentNodeProvider>
  )
}

export { CommentNode }
