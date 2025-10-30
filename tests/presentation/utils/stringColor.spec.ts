import { describe, it, expect } from 'vitest'
import { stringToColor } from '../../../src/presentation/utils/stringToColor'
import { stringAvatar } from '../../../src/presentation/utils/stringAvatar'

describe('stringToColor', () => {
  it('produces deterministic hex color', () => {
    const c1 = stringToColor('Alice')
    const c2 = stringToColor('Alice')
    const c3 = stringToColor('Bob')
    expect(c1).toBe(c2)
    expect(c1).not.toBe(c3)
    expect(/^#[0-9a-fA-F]{6}$/.test(c1)).toBe(true)
  })
})

describe('stringAvatar', () => {
  it('builds avatar props from name', () => {
    const p = stringAvatar('Juan')
    expect(p.children).toBe('Ju')
    expect(p.sx && typeof p.sx.bgcolor === 'string').toBe(true)
    expect(p.sx && p.sx.color).toBe('#FFFFFF')
  })
})

