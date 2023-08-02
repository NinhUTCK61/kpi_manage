import { colorAlphabet } from '@/libs/config/theme'
import { ReactFlowNodeOutputType } from '@/libs/schema/node'
import { isEqual } from 'lodash'
import { isEmptyKPINodeForm } from '../../helper'
import { KPINodeType, ReactFlowNode } from '../../types'

export enum SaveAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  CANCEL = 'CANCEL',
  UPDATE = 'UPDATE',
}

// New node create in client has no template_id
export const getSaveAction = (newData: KPINodeType, oldData: KPINodeType): SaveAction => {
  if (isEqual(newData, oldData)) {
    return SaveAction.CANCEL
  }

  const { template_id, input_title } = newData
  if (!template_id && input_title) {
    return SaveAction.CREATE
  }

  if (!template_id || !input_title) {
    return SaveAction.CANCEL
  }

  if (isEmptyKPINodeForm(newData)) {
    return SaveAction.DELETE
  }

  return SaveAction.UPDATE
}

export function filterKpiNodes<
  V extends T,
  T extends ReactFlowNode | ReactFlowNodeOutputType = ReactFlowNode | ReactFlowNodeOutputType,
>(nodes: T[]) {
  return nodes.filter<V>((node): node is V => node.type === 'kpi')
}

export function generateColors(text: string) {
  if (!colorAlphabet[text as keyof typeof colorAlphabet]) {
    const base_char = text.charCodeAt(0).toString().split('').reverse().join('')
    const gColor = text.charCodeAt(0) % 10
    const bColor = 10 - gColor

    return text.charCodeAt(0) % 2 === 0
      ? `#${base_char}${gColor}${gColor}${bColor}${bColor}`
      : `#${bColor}${bColor}${gColor}${gColor}${base_char}`
  }

  return colorAlphabet[text as keyof typeof colorAlphabet]
}

export function convertSlugToString(inputString: string) {
  if (!inputString) {
    return ''
  }

  let convertedString = ''

  for (let i = 0; i < inputString.length; i++) {
    if (isNaN(parseInt(inputString[i] as string))) {
      convertedString += inputString[i]
    } else {
      break
    }
  }

  return convertedString
}

export const sliceString = (str: string | null, sliceStart = 100, sliceEnd?: number) => {
  if (!str) return ''
  if (str.length > sliceStart) {
    return str.slice(0, sliceStart) + '...' + (sliceEnd ? str.slice(-Number(sliceEnd)) : '')
  }
  return str
}

export function nextSlug(slug: string) {
  const pattern = /([A-Za-z]+)(\d+)/
  const match = slug.match(pattern)

  if (match) {
    const alphaPart = match[1]
    const numericPart = parseInt(match[2] as string, 10)
    return `${alphaPart}${numericPart + 1}`
  } else {
    return slug
  }
}
