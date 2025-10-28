import { describe, it, expect } from 'vitest'
import { getColors } from '../../../src/presentation/utils/getColors'

describe('getColors', () => {
  it('returns slice when length <= 3', () => {
    expect(getColors('#000000', '#ffffff', 2)).toEqual(['#000000', '#ffffff'])
  })
  it('generates gradient array when length > 3', () => {
    const arr = getColors('#000000', '#ffffff', 5)
    expect(arr.length).toBe(5)
    expect(arr[0]).toBe('#000000')
    expect(arr.every(c => /^#[0-9a-fA-F]{6}$/.test(c))).toBe(true)
  })
})

