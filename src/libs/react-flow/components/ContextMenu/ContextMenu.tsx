import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useReactFlow } from 'reactflow'
import { useRFStore } from '../../hooks'
import { Menu, MenuItem } from '../KPINode/components/styled'
import { useSpeechBallonCreateMutation } from '../SpeechBallon'

export const ContextMenu: React.FC = () => {
  const nodeCopy = useRFStore((state) => state.nodeCopy)
  const container = useRFStore((state) => state.container)
  const setActivePosition = useRFStore((state) => state.setActivePosition)
  const activePosition = useRFStore((state) => state.activePosition)
  const { t } = useTranslation('file')
  const { mutate: create } = useSpeechBallonCreateMutation()
  const { project } = useReactFlow()
  const { top } = container?.getBoundingClientRect() ?? { top: 120 }

  const position = project({
    x: activePosition ? (activePosition.x as number) : 0,
    y: activePosition ? activePosition.y - top : 0,
  })

  const handleClose = () => {
    setActivePosition(null)
  }

  const handlePaste = () => {
    if (!nodeCopy) return
    if (nodeCopy.type === 'speech_ballon') {
      const mutateData = {
        ...nodeCopy.data,
        id: nanoid(),
        x: position.x,
        y: position.y,
      }
      create(mutateData)
    }
    handleClose()
  }

  const isDisablePaste = !nodeCopy || nodeCopy.type !== 'speech_ballon'
  const open = Boolean(activePosition)

  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        activePosition ? { top: activePosition.y, left: activePosition.x } : undefined
      }
      onContextMenu={handleClose}
    >
      <MenuItem onClick={handlePaste} disabled={isDisablePaste}>
        {t('menu_context.paste')}
      </MenuItem>
    </Menu>
  )
}
