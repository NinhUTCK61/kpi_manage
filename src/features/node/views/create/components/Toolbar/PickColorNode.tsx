import { base } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { InputStyled } from '@/libs/shared/components'
import { Button, Stack, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react'
import { useDebounce } from 'usehooks-ts'
import { useReactFlowUpdateNode } from '../../../hooks'

const PickColorNode: React.FC = () => {
  const { t } = useTranslation('file')
  const [_, startTransition] = useTransition()
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const [pickColor, setPickColor] = useState(base.black)
  const debouncedColor = useDebounce(pickColor, 300)

  const isNewFocusNode = useRef(false)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'kpi' && nodeFocused?.type !== 'speech_ballon') return

    return nodeFocused
  }, [nodeFocused])

  const { handleUpdateStyle } = useReactFlowUpdateNode(nodeFocusedMemo)

  useLayoutEffect(() => {
    if (!nodeFocusedMemo?.data.node_style) {
      setPickColor(base.black)
    } else {
      const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style)
      isNewFocusNode.current = true
      setPickColor(nodeStyle.color || base.black)
    }
  }, [nodeFocusedMemo])

  const handleUpdate = useCallback(() => {
    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    if (debouncedColor === nodeStyle?.color) return

    const newNodeStyle = JSON.stringify({ ...nodeStyle, color: debouncedColor })

    handleUpdateStyle(newNodeStyle)
  }, [nodeFocusedMemo, debouncedColor])

  useEffect(() => {
    if (isNewFocusNode.current) return

    handleUpdate()
  }, [handleUpdate])

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
          htmlFor="node-color"
        />

        <Button
          component="label"
          htmlFor="node-color"
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
          id="node-color"
          type="color"
          onChange={(e) => {
            if (isNewFocusNode.current) {
              isNewFocusNode.current = false
            }

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
