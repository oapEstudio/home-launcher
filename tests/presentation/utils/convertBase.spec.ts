import { describe, it, expect } from 'vitest'
import { getBase64Data } from '../../../src/presentation/utils/convertBase'

describe('getBase64Data', () => {
  it('returns data part when data URL provided', () => {
    const dataUrl = 'data:image/png;base64,QUJDRA=='
    expect(getBase64Data(dataUrl)).toBe('QUJDRA==')
  })
  it('returns input when no comma present', () => {
    const raw = 'QUJDRA=='
    expect(getBase64Data(raw)).toBe(raw)
  })
})

