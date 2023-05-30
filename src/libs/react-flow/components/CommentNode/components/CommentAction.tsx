import { greyScale } from '@/libs/config/theme'
import { ButtonStyle } from '@/libs/shared/components/Snackbar/styled'
import { Box, Stack, Typography } from '@mui/material'
import { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { InputStyled } from './styled'

type CommentActionType = {
  handleChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void
  content: string | null
  handleCloseEdit: () => void
  handleSaveContentChange: () => void
  currentContent: string
  commentRef: MutableRefObject<HTMLDivElement | null>
}

const CommentAction: React.FC<CommentActionType> = ({
  commentRef,
  currentContent,
  handleChangeContent,
  handleCloseEdit,
  handleSaveContentChange,
  content,
}) => {
  const { t } = useTranslation('file')
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSaveContentChange()
    }
  }

  return content !== null ? (
    <Box ref={commentRef}>
      <InputStyled
        autoFocus
        value={content}
        onChange={handleChangeContent}
        onKeyDown={handleKeyDown}
        multiline
        maxRows={10}
        fullWidth
      />

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" mt={1}>
        <ButtonStyle variant="outlined" onClick={handleCloseEdit} sx={{ mt: 0 }}>
          {t('cancel')}
        </ButtonStyle>

        <ButtonStyle variant="contained" onClick={handleSaveContentChange}>
          {t('save')}
        </ButtonStyle>
      </Stack>
    </Box>
  ) : (
    <Typography
      variant="body2"
      color={greyScale[900]}
      whiteSpace="pre-line"
      sx={{ wordWrap: 'break-word' }}
      pr={3}
    >
      {currentContent}
    </Typography>
  )
}

export { CommentAction }
