import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { Box, ListItemButton, Stack, Typography } from '@mui/material'
import { IconTop, List, ListItem, Paper } from './styled'

type SelectNodeSlugProps = {
  value: string
  handleSelect: (value: string) => void
  currentState: number
  elementRef: React.RefObject<HTMLUListElement>
}

const SelectNodeSlug: React.FC<SelectNodeSlugProps> = ({
  value,
  handleSelect,
  currentState,
  elementRef,
}) => {
  const templateId = useRFStore((state) => state.templateId)
  const slug = value.replaceAll(' ', '').toUpperCase() //validate slug
  const { data } = api.node.searchSlug.useQuery(
    {
      template_id: templateId,
      slug,
    },
    {
      initialData: [],
    },
  )

  if (!value || !data.length) return null

  return (
    <Paper elevation={2}>
      <Box sx={{ position: 'relative' }}>
        <IconTop />
        <List ref={elementRef}>
          {data.map((node, index) => (
            <ListItem
              active={String(index === currentState)}
              disablePadding
              key={index}
              onClick={() => handleSelect(node.slug)}
            >
              <ListItemButton sx={{ padding: 2 }}>
                <Stack direction="row">
                  <Typography width={67} variant="body2" color="base.black">
                    {node.slug}
                  </Typography>
                  <Typography variant="body2" color="base.black">
                    {node.input_title}
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
