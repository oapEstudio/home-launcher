import React from 'react'
import { render, screen } from '../test-utils'
import CustomDivider from '../../src/presentation/components/ui/divider'

describe('Divider', () => {
  it('renders a separator role', () => {
    render(<CustomDivider />)
    // MUI Divider has role="separator"
    expect(screen.getByRole('separator')).toBeTruthy()
  })
})

