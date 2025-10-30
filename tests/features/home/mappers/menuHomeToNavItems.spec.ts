import { describe, it, expect } from 'vitest'
import { mapMenuNode, mapMenuToNavItems } from '../../../../src/presentation/features/home/mappers/menuHomeToNavItems'
import type { IMenuHome } from '../../../../src/domain/entities/IMenuHome'

const node = (id: string, name: string, orderIndex: number, opts: Partial<IMenuHome> = {}): IMenuHome => ({
  id, name, description: name, parentId: null, link: opts.link ?? '#', hasLink: !!opts.hasLink, orderIndex, children: opts.children ?? [], hierarchyIndex: opts.hierarchyIndex,
})

describe('menuHomeToNavItems', () => {
  it('maps node with href only when hasLink and link provided', () => {
    const withLink = node('1', 'One', 2, { hasLink: true, link: '/one' })
    const noLink = node('2', 'Two', 1, { hasLink: false })
    const mapped1 = mapMenuNode(withLink)
    const mapped2 = mapMenuNode(noLink)
    expect(mapped1.id).toBe('1')
    expect(mapped1.label).toBe('One')
    expect((mapped1 as any).href).toBe('/one')
    expect('href' in mapped2).toBe(false)
  })

  it('sorts children and arrays by orderIndex', () => {
    const childA = node('c1', 'C1', 2, { hasLink: true, link: '/c1' })
    const childB = node('c2', 'C2', 1, { hasLink: true, link: '/c2' })
    const parent = node('p', 'Parent', 9, { children: [childA, childB] })
    const mapped = mapMenuNode(parent)
    expect(mapped.items?.[0].label).toBe('C2')
    expect(mapped.items?.[1].label).toBe('C1')

    const root1 = node('r1', 'R1', 3)
    const root2 = node('r2', 'R2', 1)
    const root3 = node('r3', 'R3', 2)
    const arr = mapMenuToNavItems([root1, root2, root3])
    expect(arr.map(x => x.label)).toEqual(['R2', 'R3', 'R1'])
  })
})

