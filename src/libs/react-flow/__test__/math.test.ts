import { describe, expect, test } from 'vitest'
import { getSlugFromInputValue } from '../helper/expression'

describe('Test expression to slugs', () => {
  test('(A1 + A2)*A3', () => {
    const result = getSlugFromInputValue('(A1 + A2)*A3')
    expect(result).toStrictEqual(['A1', 'A2', 'A3'])
  })

  test('A1 + (A2 *A3 +1', () => {
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

  test('A1 + (A2)^3', () => {
    const result = getSlugFromInputValue('A1 + (A2)^3')
    expect(result).toStrictEqual(['A1', 'A2'])
  })
})
