import React from 'react'
import { render, screen } from '../test-utils'
import { RedStripe } from '../../src/presentation/components/widgets/nav-bar-launcher/components/RedStripe'

describe('RedStripe', () => {
  it('renders message', () => {
    render(<RedStripe message="Alerta" />)
    expect(screen.getByText('Alerta')).toBeTruthy()
  })
})

