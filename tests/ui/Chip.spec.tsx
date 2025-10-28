import React from 'react'
import { render, screen } from '../test-utils'
import CustomChip from '../../src/presentation/components/ui/chip/chip.component'

describe('CustomChip', () => {
  it('renders label', () => {
    render(<CustomChip label="Active" severity="success" />)
    expect(screen.getByText('Active')).toBeTruthy()
  })
})

