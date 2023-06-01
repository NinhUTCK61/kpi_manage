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
import { NodeFormulaContext } from '../context'
import { NodeFormProps } from '../hooks'

export const defaultValueState = {
  anchorEl: null,
  valueSelected: '',
  startIndex: 0,
  endIndex: 0,
  currentState: 0,
}

export type StateProps = {
  anchorEl: null | HTMLElement
  valueSelected: string
  startIndex: number
  endIndex: number
  currentState: number
}

export const NodeFormulaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateProps>(defaultValueState)
  const { setError, getValues, setValue } = useFormContext<NodeFormProps>()
  const [nodeSearch, setNodeSearch] = useState<ReactFlowKPINode[]>([])
  const elementRef = useRef<HTMLUListElement>(null)
  const nodes = useRFStore((state) => state.nodes)
  const { t } = useTranslation()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!state.valueSelected) return
      if (nodes.length === 0) return
      const _state = state
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const isDown = e.key === 'ArrowDown'
        const _currentState = _state.currentState
        const stateDown = _currentState === nodeSearch.length - 1 ? 0 : _currentState + 1
        const stateUp = _currentState === 0 ? nodeSearch.length - 1 : _currentState - 1
        const currentState = isDown ? stateDown : stateUp

        _state.currentState = currentState
        setState({ ..._state })

        if (elementRef.current) {
          let top = 0
          if (isDown && currentState >= 4) {
            top = currentState * 54
          }
          if (!isDown) {
            top = currentState * 54
          }
          elementRef.current.scrollTop = top
        }
        e.preventDefault()
      }

      if (e.key === 'Enter') {
        const newValue = convertFormula(
          getValues('input_value') as string,
          nodeSearch[state.currentState]?.data?.slug as string,
          state.startIndex,
          state.endIndex,
        )
        setValue('input_value', newValue)
        setState(defaultValueState)
        e.preventDefault()
      }
    },
    [getValues, nodeSearch, nodes.length, setValue, state],
  )

  const handlingData = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) => {
      const data = charFullNearCursor(e)
      const _state = state
      if (!data?.resultString.replaceAll(' ', '')) {
        setState(defaultValueState)
        return
      }

      const check = nodes.filter(
        (e: ReactFlowNode) =>
          e.type === 'kpi' &&
          e.data.slug.includes(data.resultStringFull.replaceAll(' ', '').toUpperCase()),
      ) as ReactFlowKPINode[]

      if (check.length !== 0) {
        setState({
          ..._state,
          anchorEl: e.currentTarget,
          valueSelected: data.resultStringFull as string,
          startIndex: data.startIndex,
          endIndex: data.endIndex,
        })
        setNodeSearch(check)
        return
      }

      setError('input_value', {
        message: t('error.node_not_found_1') + data.resultStringFull + t('error.node_not_found_2'),
      })
    },
    [nodes, setError, state, t],
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
        state.startIndex,
        state.endIndex,
      )
      setValue('input_value', newValue)
      setState(defaultValueState)
    },
    [getValues, setValue, state.endIndex, state.startIndex],
  )

  const contextValue = useMemo(
    () => ({
      state,
      handleKeyDown,
      handleKeyUp,
      handleSelect,
      handleClick,
      nodeSearch,
      elementRef,
    }),
    [handleClick, handleKeyDown, handleKeyUp, handleSelect, nodeSearch, state],
  )

  return <NodeFormulaContext.Provider value={contextValue}>{children}</NodeFormulaContext.Provider>
}
