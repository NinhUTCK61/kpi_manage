import { Popover, Stack } from '@mui/material'
import React, { PropsWithChildren } from 'react'

const MenuAction: React.FC<
  PropsWithChildren<{
    handleCloseMenu: () => void
    activeMenu: HTMLButtonElement | null | undefined
  }>
> = ({ children, handleCloseMenu, activeMenu }) => {
  return (
    <Popover
      open={!!activeMenu}
      anchorEl={activeMenu}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Stack borderRadius={0.5} overflow="hidden">
        {children}
      </Stack>
    </Popover>
  )
}

export { MenuAction }
