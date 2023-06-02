import { base, customPrimary } from '@/libs/config/theme'
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
import { useNodeUpdateHandler } from '../../../hooks'

const PickColorShape: React.FC = () => {
  const { t } = useTranslation('file')

  const [pickColor, setPickColor] = useState<string>(customPrimary[600])
  const [_, startTransition] = useTransition()
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const id = 'colorShape'

  const debouncedColor = useDebounce(pickColor, 300)

  const isNewFocusNode = useRef(false)

  const nodeFocusedMemo = useMemo(() => {
    if (nodeFocused?.type !== 'speech_ballon') return

    return nodeFocused
  }, [nodeFocused])

  const { updateStyle } = useNodeUpdateHandler(nodeFocusedMemo)

  const updateSpeechBallonStyle = useCallback(
    (newNodeStyle: string) => updateStyle({ node_style: newNodeStyle }),
    [updateStyle],
  )

  useLayoutEffect(() => {
    if (!nodeFocusedMemo?.data.node_style) {
      setPickColor(customPrimary[700])
    } else {
      const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style)
      isNewFocusNode.current = true
      setPickColor(nodeStyle.background || customPrimary[700])
    }
  }, [nodeFocusedMemo])

  const handleUpdate = useCallback(() => {
    if (!nodeFocusedMemo) return
    const nodeStyle = JSON.parse(nodeFocusedMemo.data.node_style || '{}')

    if (debouncedColor === nodeStyle?.background) return

    const newNodeStyle = JSON.stringify({ ...nodeStyle, background: debouncedColor })

    updateSpeechBallonStyle(newNodeStyle)
  }, [nodeFocusedMemo, debouncedColor, updateSpeechBallonStyle])

  useEffect(() => {
    if (isNewFocusNode.current) return

    handleUpdate()
  }, [handleUpdate])

  return (
    <Tooltip title={t('fill')} arrow>
      <Stack direction="row" height={36} alignItems="center" mr={1}>
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

export { PickColorShape }
