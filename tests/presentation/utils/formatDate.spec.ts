import { describe, it, expect } from 'vitest'
import { formatDate } from '../../../src/presentation/utils/formatDate'

describe('formatDate', () => {
  it('formats as dd/mm/yyyy for en-GB', () => {
    const s = formatDate(new Date('2025-01-15T12:34:56Z'), { locale: 'en-GB' })
    expect(/\d{2}\/\d{2}\/\d{4}/.test(s)).toBe(true)
  })
  it('includes time when includeTime=true', () => {
    const s = formatDate(new Date('2025-01-15T12:34:56Z'), { locale: 'en-GB', includeTime: true })
    expect(s).toMatch(/\d{2}:\d{2}/)
  })
})

