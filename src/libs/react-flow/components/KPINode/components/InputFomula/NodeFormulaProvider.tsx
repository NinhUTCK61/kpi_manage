import { SUGGEST_ITEM_HEIGHT } from '@/libs/react-flow/constant'
import { charFullNearCursor, convertFormula } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import React, {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { useActiveElement } from '../../../../../hooks/useActiveElement'
import { NodeFormProps, useFormularHanlder } from '../../hooks'
import { NodeFormulaContext } from './context'

export const defaultValueState = {
  anchorEl: null,
  textSelected: '',
  startIndexText: 0,
  endIndexText: 0,
  indexSuggest: 0,
}

export type SuggestStateProps = {
  anchorEl: null | HTMLElement
  textSelected: string
  startIndexText: number
  endIndexText: number
  indexSuggest: number
}

const inputDisable = ['input_value', 'unit']

export const NodeFormulaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [suggestState, setSuggestState] = useState<SuggestStateProps>(defaultValueState)
  const { setError, getValues, setValue, setFocus } = useFormContext<NodeFormProps>()
  const [nodeSearch, setNodeSearch] = useState<ReactFlowKPINode[]>([])
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const elementRef = useRef<HTMLUListElement>(null)
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const { nodeInputValidate } = useFormularHanlder()
  const { activeElement } = useActiveElement()

  useEffect(() => {
    if (!activeElement) return
    if (inputDisable.includes(activeElement.getAttribute('name') as string))
      setSuggestState(defaultValueState)
  }, [activeElement])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!suggestState.textSelected) return
      if (nodeSearch.length === 0) return
      if (!nodeFocused || nodeFocused.type !== 'kpi') return
      if (e.key === 'Escape') {
        setNodeSearch([])
        e.stopPropagation()
        return
      }

      const _state = suggestState
      // bắt sự kiện keyDown,keyUp để chuyển vị trí select trong popup suggest
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const isDown = e.key === 'ArrowDown'
        const _indexSuggest = _state.indexSuggest
        const stateDown = _indexSuggest === nodeSearch.length - 1 ? 0 : _indexSuggest + 1
        const stateUp = _indexSuggest === 0 ? nodeSearch.length - 1 : _indexSuggest - 1
        const indexSuggest = isDown ? stateDown : stateUp

        _state.indexSuggest = indexSuggest
        setSuggestState({ ..._state })

        if (elementRef.current) {
          let top = 0
          if (isDown && indexSuggest >= 4) {
            top = indexSuggest * SUGGEST_ITEM_HEIGHT
          }
          if (!isDown) {
            top = indexSuggest * SUGGEST_ITEM_HEIGHT
          }
          elementRef.current.scrollTop = top
        }
        e.preventDefault()
      }

      if (e.key === 'Enter') {
        // Thay đổi value tại vị trí của con trỏ
        const valueNodeSuggest = nodeSearch[suggestState.indexSuggest]?.data?.slug as string
        if (valueNodeSuggest === nodeFocused.data.slug) {
          e.stopPropagation()
          return
        }
        const newValue = convertFormula(
          getValues('input_value') as string,
          valueNodeSuggest,
          suggestState.startIndexText,
          suggestState.endIndexText,
        )
        setValue('input_value', newValue)
        setSuggestState(defaultValueState)
        setFocus('input_value')
        e.preventDefault()
        e.stopPropagation()
        return
      }
    },
    [getValues, nodeFocused, nodeSearch, setFocus, setValue, suggestState],
  )

  const handlingData = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) => {
      if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return

      const data = charFullNearCursor(e)
      const nodes = getKpiNodes()

      const inputValue = (e.target as HTMLInputElement).value
      //get list slug node invalid
      if (inputValue.startsWith('=')) {
        const errorMessage = nodeInputValidate(inputValue, nodes, nodeFocused)
        if (errorMessage) setError('input_value', { message: errorMessage })
      }
      const _state = suggestState
      if (!data?.resultString.replaceAll(' ', '')) {
        setSuggestState(defaultValueState)
        return
      }

      const check = nodes.filter(
        (e) =>
          e.data.slug.includes(data.resultStringFull.replaceAll(' ', '').toUpperCase()) ||
          e.data.slug.includes(data.resultStringFull.replaceAll(' ', '')),
      ) as ReactFlowKPINode[]

      if (check.length !== 0) {
        setSuggestState({
          ..._state,
          anchorEl: e.currentTarget,
          textSelected: data.resultStringFull as string,
          startIndexText: data.startIndex,
          endIndexText: data.endIndex,
        })
        setNodeSearch(check)
        return
      }
      setNodeSearch([])
    },
    [getKpiNodes, nodeFocused, nodeInputValidate, setError, suggestState],
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === 'Escape') return
      handlingData(e)
    },
    [handlingData],
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      handlingData(e)
    },
    [handlingData],
  )

  const handleSelect = useCallback(
    (valueSelect: string) => {
      const newValue = convertFormula(
        getValues('input_value') as string,
        valueSelect,
        suggestState.startIndexText,
        suggestState.endIndexText,
      )
      setValue('input_value', newValue)
      setSuggestState(defaultValueState)
      setFocus('input_value')
      //Sau khi chọn xong thì phải focus lại input
    },
    [getValues, setFocus, setValue, suggestState.endIndexText, suggestState.startIndexText],
  )

  const contextValue = useMemo(
    () => ({
      suggestState,
      handleKeyDown,
      handleKeyUp,
      handleSelect,
      handleClick,
      nodeSearch,
      elementRef,
    }),
    [handleClick, handleKeyDown, handleKeyUp, handleSelect, nodeSearch, suggestState],
  )

  return <NodeFormulaContext.Provider value={contextValue}>{children}</NodeFormulaContext.Provider>
}
