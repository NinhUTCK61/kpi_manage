import { Box, ListItemButton, Stack, Typography } from '@mui/material'
import { useNodeFormulaContext } from '../context'
import { IconTop, List, ListItem, Paper } from './styled'

const SelectNodeSlug: React.FC = ({}) => {
  const { state, nodeSearch, elementRef, handleSelect } = useNodeFormulaContext()
  if (!state.valueSelected || !nodeSearch?.length) return null

  return (
    <Paper elevation={2}>
      <Box sx={{ position: 'relative' }}>
        <IconTop />
        <List ref={elementRef}>
          {nodeSearch.map((node, index) => (
            <ListItem
              active={index === state.currentState}
              disablePadding
              key={index}
              onClick={() => handleSelect(node.data.slug)}
            >
              <ListItemButton sx={{ padding: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Typography width={100} variant="body2" color="base.black">
                    {node.data.slug}
                  </Typography>
                  <Typography variant="body2" color="base.black">
                    {node.data.input_title}
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}

export { SelectNodeSlug }
