import { SUGGEST_ITEM_HEIGHT } from '@/libs/react-flow/constant'
import { charFullNearCursor, convertFormula } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowKPINode, ReactFlowNode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import React, {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { NodeFormProps } from '../../hooks'
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

export const NodeFormulaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [suggestState, setSuggestState] = useState<SuggestStateProps>(defaultValueState)
  const { setError, getValues, setValue } = useFormContext<NodeFormProps>()
  const [nodeSearch, setNodeSearch] = useState<ReactFlowKPINode[]>([])
  const elementRef = useRef<HTMLUListElement>(null)
  const nodes = useRFStore((state) => state.nodes)
  const { t } = useTranslation()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!suggestState.textSelected) return
      if (nodeSearch.length === 0) return
      const _state = suggestState
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
        const newValue = convertFormula(
          getValues('input_value') as string,
          nodeSearch[suggestState.indexSuggest]?.data?.slug as string,
          suggestState.startIndexText,
          suggestState.endIndexText,
        )
        setValue('input_value', newValue)
        setSuggestState(defaultValueState)
        e.preventDefault()
      }
    },
    [getValues, nodeSearch, setValue, suggestState],
  )

  const handlingData = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) => {
      const data = charFullNearCursor(e)
      const _state = suggestState
      if (!data?.resultString.replaceAll(' ', '')) {
        setSuggestState(defaultValueState)
        return
      }

      const check = nodes.filter(
        (e: ReactFlowNode) =>
          e.type === 'kpi' &&
          e.data.slug.includes(data.resultStringFull.replaceAll(' ', '').toUpperCase()),
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

      setError('input_value', {
        message: t('error.node_not_found_1') + data.resultStringFull + t('error.node_not_found_2'),
      })
    },
    [nodes, setError, suggestState, t],
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') return
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
    },
    [getValues, setValue, suggestState.endIndexText, suggestState.startIndexText],
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