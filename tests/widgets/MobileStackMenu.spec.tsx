import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import { MobileStackMenu } from '../../src/presentation/components/widgets/menu-home/MobileStackMenu'
import type { NavItem } from '../../src/presentation/components/widgets/menu-home/types'

const data: NavItem[] = [
  { id: 'root', label: 'Root',  items: [
    { id: 'child', label: 'Child', href: '#'}
  ]}
]

describe('MobileStackMenu', () => {
  it('navigates to children and back', () => {
    render(<MobileStackMenu data={data} onClose={() => {}} />)
    // open child level
    fireEvent.click(screen.getByText('Root'))
    // should show back row
    expect(screen.getByText('Volver')).toBeTruthy()
    // go back
    fireEvent.click(screen.getByText('Volver'))
    // top level visible again
    expect(screen.getByText('Root')).toBeTruthy()
  })
})

