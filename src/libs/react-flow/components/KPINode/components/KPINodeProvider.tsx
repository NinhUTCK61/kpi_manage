import { KPINodeType } from '@/libs/react-flow/types'
import { NodeFormSchema } from '@/libs/schema/node'
import { ContextMenuState } from '@/libs/shared/types/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { KPINodeContext } from '../context'
import { NodeFormProps } from '../hooks'

const KPINodeProvider: React.FC<
  React.PropsWithChildren<{
    data: KPINodeType
    isConnectable: boolean
  }>
> = ({ children, data, isConnectable }) => {
  const form = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      input_value: data.input_value || '',
      unit: data.unit || '',
    },
    values: {
      input_title: data.input_title || '',
      input_value: data.input_value || '',
      unit: data.unit || '',
    },
    resolver: zodResolver(NodeFormSchema),
    mode: 'onChange',
  })

  const [contextMenu, _setContextMenu] = useState<ContextMenuState>(null)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu(
      !contextMenu
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : null,
    )
  }
  const setContextMenu = (value: ContextMenuState) => {
    _setContextMenu(value)
  }

  const contextValue = useMemo(
    () => ({
      form,
      contextMenu,
      setContextMenu,
      data,
      isConnectable,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contextMenu, data, form.formState, isConnectable],
  )

  return (
    <KPINodeContext.Provider value={contextValue}>
      <Stack onContextMenu={handleContextMenu}>{children}</Stack>
    </KPINodeContext.Provider>
  )
}

export { KPINodeProvider }
