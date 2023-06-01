import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { Box, ListItemButton, Stack, Typography } from '@mui/material'
import { IconTop, List, ListItem, Paper } from './styled'

type SelectNodeSlugProps = {
  value: string
  handleSelect: (value: string) => void
  currentState: number
  elementRef: React.RefObject<HTMLUListElement>
  nodeSearch: ReactFlowKPINode[]
}

const SelectNodeSlug: React.FC<SelectNodeSlugProps> = ({
  value,
  handleSelect,
  currentState,
  elementRef,
  nodeSearch,
}) => {
  if (!value || !nodeSearch?.length) return null

  return (
    <Paper elevation={2}>
      <Box sx={{ position: 'relative' }}>
        <IconTop />
        <List ref={elementRef}>
          {nodeSearch.map((node, index) => (
            <ListItem
              active={index === currentState}
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
