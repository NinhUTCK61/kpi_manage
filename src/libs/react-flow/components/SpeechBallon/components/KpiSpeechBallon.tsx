import { ContextMenuState } from '@/libs/shared/types/utils'
import { Menu, Stack, styled } from '@mui/material'
import React, { RefObject, createContext, useMemo } from 'react'
import { OptionShape } from './OptionShape'

type KpiSpeechBallonProps = {
  contextMenu: ContextMenuState
  onClose: () => void
  containerRef: RefObject<HTMLElement>
}

type ContextType = {
  top: number
  left: number
}

export const SpeechBallonProvider = createContext<ContextType>({ top: 0, left: 0 })

const KpiSpeechBallon: React.FC<KpiSpeechBallonProps> = ({
  contextMenu,
  onClose,
  containerRef,
}) => {
  const { top, left } = useMemo(() => {
    const position = containerRef.current?.getBoundingClientRect() ?? {
      top: 0,
      left: 0,
    }
    console.log(containerRef.current?.getBoundingClientRect(), 'SIZEEEEEEE')
    return position
  }, [containerRef.current])
  return (
    <SpeechBallonProvider.Provider value={{ top, left }}>
      <MuiMenuContext
        open={!!contextMenu}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          !!contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <Stack spacing={0.5}>
          <OptionShape />
        </Stack>
      </MuiMenuContext>
    </SpeechBallonProvider.Provider>
  )
}

export { KpiSpeechBallon }

const MuiMenuContext = styled(Menu)(({ theme }) => ({
  '.MuiMenu-paper': {
    boxShadow: 'none',
    overflow: 'initial',
  },
}))
