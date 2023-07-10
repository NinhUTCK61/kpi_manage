import { useNodeDeleteMutation, useRFStore } from '@/libs/react-flow'
import { DialogAction } from '@/libs/shared/components'
import { useTranslation } from 'next-i18next'

const DialogDeleteNode = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation(['common'])
  const dialogDelete = useRFStore((state) => state.dialogDelete)
  const handleToggleDialogDelete = useRFStore((state) => state.handleToggleDialogDelete)
  const { mutate } = useNodeDeleteMutation()
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const handleDeleteNode = () => {
    const nodes = getKpiNodes()
    const node = nodes.find((node) => node.data.slug === dialogDelete?.node)
    if (node) {
      mutate(
        { id: node.id },
        {
          onSuccess: () => {
            handleToggleDialogDelete()
          },
        },
      )
    }
  }

  if (!dialogDelete) return null

  const isJapanese = language === 'jp'

  const title = isJapanese
    ? '「' + dialogDelete.node + '」' + t('dialog.delete_node')
    : t('dialog.delete_node') + '[' + dialogDelete.node + ']'

  const description =
    t('error.delete_node_has_formula_1') +
    dialogDelete.nodeRelated?.join(',') +
    t('error.delete_node_has_formula_2')

  return (
    <DialogAction
      open={!!dialogDelete.open}
      handleClose={() => handleToggleDialogDelete()}
      type="warning"
      handleConfirm={handleDeleteNode}
      textSubmit={t('dialog.delete') as string}
      title={title}
      description={description}
    />
  )
}

export { DialogDeleteNode }
