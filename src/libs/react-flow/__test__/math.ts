import { describe, expect, test } from 'vitest'
import { getSlugFromInputValue } from '../helper/expression'

describe('Node Hierarchy', () => {
  test('Convert expression to array key', () => {
    const result = getSlugFromInputValue('(A1 + A2)*A3')
    expect(result).toStrictEqual(['A1', 'A2', 'A3'])
  })

  test('Convert expression to array key', () => {
    const result = getSlugFromInputValue('A1 + (A2 *A3 +1')
    expect(result).toStrictEqual(['A1', 'A2', 'A3'])
  })

  test('Convert expression to array key', () => {
    const result = getSlugFromInputValue('A1 + x + (A2 *A3/A4)')
    expect(result).toStrictEqual(['A1', 'A2', 'A3', 'A4'])
  })

  test('Convert expression to array key', () => {
    const result = getSlugFromInputValue('A111 / 0 ')
    expect(result).toStrictEqual(['A111'])
  })

  test('Convert expression to array key', () => {
    const result = getSlugFromInputValue('A_1 / A^3 ')
    expect(result).toStrictEqual(['A_1', 'A^3'])
  })
})
