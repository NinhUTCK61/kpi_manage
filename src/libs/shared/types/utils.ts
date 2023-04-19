type DialogBaseProps<T = Record<string, unknown>> = {
  open: boolean
  handleClose(): void
} & T

export type { DialogBaseProps }
