import React from 'react'
import { render, screen } from '../test-utils'
import Required from '../../src/presentation/components/ui/required/required.component'

describe('Required', () => {
  it('renders required marker', () => {
    render(<Required value="*" />)
    expect(screen.getByText('*')).toBeTruthy()
  })
})

