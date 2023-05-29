import { greyScale } from '@/libs/config/theme'
import { ButtonStyle } from '@/libs/shared/components/Snackbar/styled'
import { Stack, Typography } from '@mui/material'
import { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { InputStyled } from './styled'

type CommentActionType = {
  handleChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void
  content: string | null
  handleCloseEdit: () => void
  handleSaveContentChange: () => void
  contentCurrent: string
  ref: RefObject<HTMLDivElement>
}

const CommentAction: React.FC<CommentActionType> = ({
  ref,
  contentCurrent,
  handleChangeContent,
  handleCloseEdit,
  handleSaveContentChange,
  content,
}) => {
  const { t } = useTranslation('file')

  return content !== null ? (
    <Stack direction="column" ref={ref}>
      <InputStyled value={content} onChange={handleChangeContent} multiline maxRows={10} />

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" mt={1}>
        <ButtonStyle variant="outlined" onClick={handleCloseEdit} sx={{ mt: 0 }}>
          {t('cancel')}
        </ButtonStyle>

        <ButtonStyle variant="contained" onClick={handleSaveContentChange}>
          {t('save')}
        </ButtonStyle>
      </Stack>
    </Stack>
  ) : (
    <Typography
      variant="body2"
      color={greyScale[900]}
      whiteSpace="pre-line"
      sx={{ wordWrap: 'break-word' }}
    >
      {contentCurrent}
    </Typography>
  )
}

export { CommentAction }
