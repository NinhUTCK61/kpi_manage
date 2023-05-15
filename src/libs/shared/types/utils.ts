type DialogBaseProps<T = Record<string, unknown>> = {
  open: boolean
  handleClose(): void
} & T

type DialogActionType = 'delete' | 'warning' | 'default'

type ContextMenuState = {
  mouseX: number
  mouseY: number
} | null

export type { DialogBaseProps, DialogActionType, ContextMenuState }
