import { Title } from '@/features/auth'
import { api } from '@/libs/api'
import { useModalState } from '@/libs/hooks'
import { useClearParam } from '@/libs/hooks/useClearParam'
import { DialogAction, Layout } from '@/libs/shared/components'
import { DialogActionType } from '@/libs/shared/types/utils'
import { Box, CircularProgress, Grid, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useState } from 'react'
import { ThumbnailAction } from '../../components'
import { useDeleteTemplate, useRestoreTemplate } from '../../hooks'
import { FileAction } from '../../types/template'
import { TemplateItem } from '../home/components'
import EmptyFile from '/public/assets/svgs/no_file.svg'

export const Favorite = () => {
  const { t } = useTranslation(['home', 'favorite', 'common'])
  const [nodeId, setNodeId] = useState<string>()
  const [action, setAction] = useState<Exclude<FileAction, FileAction.UpdateThumbnail> | null>(null)

  const {
    isOpen: isOpenThumbnail,
    onOpen: openDialogThumbnail,
    onClose: closeDialogThumbnail,
  } = useModalState()

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
      textSubmit: t('delete'),
      action: () =>
        mutationDelete.mutate({
          id: String(nodeId),
          is_permanently: true,
        }),
    },
  }

  useClearParam()

  const { data: favoriteData, refetch, isLoading } = api.template.favorite.useQuery()

  return (
    <Layout title={t('seo_title_favorite', { ns: 'favorite' })}>
      <Stack mb={{ xs: 2, sm: 3 }}>
        <Title>{t('favorite_files', { ns: 'favorite' })}</Title>
      </Stack>

      {isLoading ? (
        <Stack direction="row" justifyContent="center" alignItems="center" height="70%">
          <CircularProgress size="2rem" />
        </Stack>
      ) : favoriteData && favoriteData.length > 0 ? (
        <Grid
          container
          rowSpacing={4}
          spacing={2}
          columns={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
        >
          {favoriteData?.map((template, index) => (
            <Grid item xs={2} key={index}>
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
          <Box width={{ xs: 118, sm: 200 }} height={{ xs: 118, sm: 200 }}>
            <Image
              src={EmptyFile}
              style={{ width: '100%', height: '100%' }}
              alt={t('no_file', { ns: 'common' })}
            />
          </Box>
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
