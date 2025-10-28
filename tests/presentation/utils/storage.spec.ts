import { describe, it, expect } from 'vitest'
import { getItem, setItem, removeItem } from '../../../src/presentation/utils/storage'

describe('storage', () => {
  it('sets, gets and removes items', () => {
    const key = 'k1'
    removeItem(key) // ensure clean
    expect(getItem(key)).toBeNull()
    const value = { a: 1 }
    setItem(key, value)
    expect(getItem(key)).toEqual(value)
    removeItem(key)
    expect(getItem(key)).toBeNull()
  })
})

