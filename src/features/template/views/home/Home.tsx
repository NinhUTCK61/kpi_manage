import { ThumbnailAction } from '@/features/template/components'
import { api } from '@/libs/api'
import { useModalState } from '@/libs/hooks'
import { DialogAction, Layout } from '@/libs/shared/components'
import { DialogActionType } from '@/libs/shared/types/utils'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import AddIcon from 'public/assets/svgs/plus.svg'
import { useState } from 'react'
import { useCreateTemplate, useDeleteTemplate, useRestoreTemplate } from '../../hooks'
import { FileAction } from '../../types/template'
import { ButtonCreate, SelectStatus, TemplateItem } from './components'

const Home = () => {
  const { t } = useTranslation('home')
  const [nodeId, setNodeId] = useState<string>()
  const [action, setAction] = useState<Exclude<FileAction, FileAction.UpdateThumbnail> | null>(null)
  const [isTrash, setIsTrash] = useState<boolean>(false)
  const {
    isOpen: isOpenThumbnail,
    onOpen: openDialogThumbnail,
    onClose: closeDialogThumbnail,
  } = useModalState()

  const mutationCreate = useCreateTemplate()
  const mutationRestore = useRestoreTemplate()
  const mutationDelete = useDeleteTemplate()

  const handleFileAction = (id: string, type: FileAction) => {
    setNodeId(id)
    if (type === FileAction.UpdateThumbnail) {
      openDialogThumbnail()
    } else {
      setAction(type)
    }
  }

  const handleConfirmAction = () => {
    if (!action) return
    OPTION_ACTIONS[action].action()
    setAction(null)
  }

  const OPTION_ACTIONS = {
    [FileAction.Delete]: {
      title: t('delete_file'),
      description: t('detail_dialog_delete'),
      handleConfirm: handleConfirmAction,
      type: 'delete',
      textSubmit: t('delete'),
      action: () =>
        mutationDelete.mutate({
          id: String(nodeId),
        }),
    },
    [FileAction.Restore]: {
      title: t('restore_title'),
      description: t('detail_dialog_restore'),
      handleConfirm: handleConfirmAction,
      type: 'warning',
      textSubmit: t('restore_confirm'),
      action: () =>
        mutationRestore.mutate({
          id: String(nodeId),
        }),
    },
    [FileAction.DeletePermanently]: {
      title: t('permanently_delete'),
      description: t('detail_dialog_delete_per'),
      handleConfirm: handleConfirmAction,
      type: 'delete',
      textSubmit: t('permanently_delete'),
      action: () =>
        mutationDelete.mutate({
          id: String(nodeId),
          is_permanently: true,
        }),
    },
  }

  const { data, refetch } = api.template.list.useQuery(
    {
      isTrash: isTrash,
    },
    {
      initialData: [],
    },
  )

  return (
    <Layout title={t('seo_title')}>
      <ButtonCreate
        variant="contained"
        startIcon={<Image src={AddIcon} alt="add" />}
        onClick={() => mutationCreate.mutate()}
      >
        {t('create')}
      </ButtonCreate>

      <SelectStatus isTrash={isTrash} setIsTrash={setIsTrash} />

      <Grid container rowSpacing={4} spacing={2} columns={{ md: 12, xl: 15 }}>
        {data.map((template, index) => (
          <Grid item key={index} xl="auto" lg={3} md={4} sm={5} xs={12}>
            <TemplateItem
              template={template}
              handleFileAction={handleFileAction}
              refetch={refetch}
            />
          </Grid>
        ))}
      </Grid>

      {action && (
        <DialogAction
          open={!!action}
          handleClose={() => setAction(null)}
          handleConfirm={OPTION_ACTIONS[action].handleConfirm}
          title={OPTION_ACTIONS[action].title}
          description={OPTION_ACTIONS[action].description}
          type={OPTION_ACTIONS[action].type as DialogActionType}
          textSubmit={OPTION_ACTIONS[action].textSubmit}
        />
      )}

      <ThumbnailAction
        isOpen={isOpenThumbnail}
        onClose={closeDialogThumbnail}
        onOpen={openDialogThumbnail}
        idTemplate={String(nodeId)}
      />
    </Layout>
  )
}

export { Home }
