import { describe, it, expect } from 'vitest'
import { toQuickLink } from '../../../../src/presentation/features/home/mappers/highlightMapper'
import type { IHighlight } from '../../../../src/domain/entities/IHighlight'

describe('highlightMapper.toQuickLink', () => {
  it('maps IHighlight to QuickLink with expected fields', () => {
    const src: IHighlight = {
      title: 'Important',
      description: 'Read this',
      link: 'https://example.com',
      hierarchyIndex: 7,
    }
    const q = toQuickLink(src)
    expect(q.id).toBe('Important')
    expect(q.label).toBe('Important')
    expect(q.description).toBe('Read this')
    expect(q.href).toBe('https://example.com')
    expect(q.isActive).toBe(true)
    expect(q.target).toBe('_blank')
    expect(q.order).toBe(7)
  })
})

