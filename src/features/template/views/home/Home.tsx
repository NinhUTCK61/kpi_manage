import { ThumbnailAction } from '@/features/template/components'
import { api } from '@/libs/api'
import { useModalState } from '@/libs/hooks'
import { useClearParam } from '@/libs/hooks/useClearParam'
import { DialogAction, Layout } from '@/libs/shared/components'
import { DialogActionType } from '@/libs/shared/types/utils'
import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AddIcon from 'public/assets/svgs/plus.svg'
import { useState } from 'react'
import { useCreateTemplate, useDeleteTemplate, useRestoreTemplate } from '../../hooks'
import { FileAction } from '../../types/template'
import { ButtonCreate, SelectStatus, TemplateItem } from './components'
import EmptyFile from '/public/assets/svgs/no_file.svg'

const Home = () => {
  const { t } = useTranslation(['home', 'common'])
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

  const router = useRouter()
  const searchParam = (router.query.search as string) || ''

  useClearParam()

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
      textSubmit: t('delete'),
      action: () =>
        mutationDelete.mutate({
          id: String(nodeId),
          is_permanently: true,
        }),
    },
  }

  const { data, refetch, isLoading } = api.template.list.useQuery({
    isTrash: isTrash,
    searchName: searchParam ? searchParam : '',
  })

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

      {isLoading ? (
        <Stack direction="row" justifyContent="center" alignItems="center" height="70%">
          <CircularProgress size="2rem" />
        </Stack>
      ) : data && data.length > 0 ? (
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
      ) : (
        <Stack direction="column" alignItems="center" height="70%" justifyContent="center">
          <Image
            src={EmptyFile}
            width={200}
            height={200}
            alt={
              isTrash ? t('no_deleted_files', { ns: 'common' }) : t('no_files', { ns: 'common' })
            }
          />

          <Typography variant="body2" mt={2}>
            {isTrash ? t('no_deleted_files', { ns: 'common' }) : t('no_files', { ns: 'common' })}
          </Typography>
        </Stack>
      )}

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
