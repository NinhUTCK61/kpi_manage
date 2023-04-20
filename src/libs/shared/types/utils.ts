type DialogBaseProps<T = Record<string, unknown>> = {
  open: boolean
  handleClose(): void
} & T

type DialogActionType = 'delete' | 'warning' | 'default'

export type { DialogBaseProps, DialogActionType }
