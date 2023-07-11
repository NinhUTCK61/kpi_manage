type DialogBaseProps<T = Record<string, unknown>> = {
  open: boolean
  handleClose(): void
} & T

type DialogActionType = 'delete' | 'warning' | 'default'

type ContextMenuState = {
  mouseX: number
  mouseY: number
} | null

type DialogDeleteNodeProps = {
  open: boolean
  node: string
  nodeRelated: string[]
}

export type { ContextMenuState, DialogActionType, DialogBaseProps, DialogDeleteNodeProps }
