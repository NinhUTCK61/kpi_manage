import { Box, ListItemButton, Stack, styled, Typography } from '@mui/material'
import { IconTop, List, ListItem, Paper } from '../styled'
import { useNodeFormulaContext } from './context'

const SelectNodeSlug: React.FC = () => {
  const { suggestState, nodeSearch, elementRef, handleSelect } = useNodeFormulaContext()
  if (!suggestState.textSelected || !nodeSearch?.length) return null

  return (
    <Paper elevation={2}>
      <Box sx={{ position: 'relative' }}>
        <IconTop />
        <List ref={elementRef}>
          {nodeSearch.map((node, index) => (
            <ListItem
              active={index === suggestState.indexSuggest}
              disablePadding
              key={index}
              onClick={() => handleSelect(node.data.slug)}
            >
              <ListItemButton sx={{ padding: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Typography width={100} variant="body2" color="base.black">
                    {node.data.slug}
                  </Typography>
                  <TextOverflow variant="body2" color="base.black">
                    {node.data.input_title}
                  </TextOverflow>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}

const TextOverflow = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: 180,
})

export { SelectNodeSlug }
