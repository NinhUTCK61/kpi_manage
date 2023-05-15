import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { useNodeUpdateMutation } from '@/libs/react-flow/components/KPINode/hooks'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState, useTransition } from 'react'
import { useDebounce } from 'usehooks-ts'
import { ReactFlowKPINode } from '../../../../../../libs/react-flow/types/node'

const PickColorNode: React.FC = () => {
  const { t } = useTranslation('file')
  const [isPending, startTransition] = useTransition()
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const id = 'color'

  const nodeFocusedMemo = useMemo<ReactFlowKPINode | undefined>(() => {
    if (nodeFocused?.type === 'kpi') return nodeFocused
  }, [nodeFocused])

  const [pickColor, setPickColor] = useState<string>(
    nodeFocusedMemo?.data.node_style
      ? JSON.parse(nodeFocusedMemo.data.node_style)?.color
      : base.black,
  )

  const debouncedColor = useDebounce<string>(pickColor, 100)

  const { mutate: update } = useNodeUpdateMutation()

  useLayoutEffect(() => {
    if (!nodeFocusedMemo?.data.node_style) {
      setPickColor(base.black)
    } else {
      const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style)
      setPickColor(nodeStyle.color)
    }
  }, [nodeFocusedMemo])

  const handleUpdate = useCallback(() => {
    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')
    if (debouncedColor === nodeStyle?.color) return
    update({
      ...nodeFocusedMemo.data,
      node_style: JSON.stringify({ ...nodeStyle, color: debouncedColor }),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor, update])

  useEffect(() => {
    if (!debouncedColor) return
    handleUpdate()
  }, [debouncedColor, handleUpdate])

  return (
    <Tooltip title={t('text_color')} arrow>
      <Stack direction="row" height={36} alignItems="center" mr={3}>
        <Stack
          sx={{
            backgroundColor: pickColor,
            borderRadius: '2px 0px 0px 2px',
            height: 36,
            width: 36,
            p: 0,
            cursor: 'pointer',
          }}
          component="label"
          htmlFor={id}
        />

        <Button
          component="label"
          htmlFor={id}
          sx={{
            backgroundColor: base.white,
            color: base.black,
            height: 36,
            borderRadius: 0,
            fontWeight: 400,
            p: '7px 14px 7px 8px',
            width: 74,
          }}
          disableRipple
        >
          {pickColor && pickColor.replace('#', '')}
        </Button>

        <InputStyled
          id={id}
          type="color"
          onChange={(e) => {
            startTransition(() => {
              setPickColor(e.target.value)
            })
          }}
          value={pickColor}
          label={pickColor}
          sx={{ width: 0, height: 0, opacity: 0, position: 'absolute' }}
        />
      </Stack>
    </Tooltip>
  )
}

export { PickColorNode }
