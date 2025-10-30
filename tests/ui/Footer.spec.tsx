import React from 'react'
import { render } from '../test-utils'
import Footer from '../../src/presentation/components/ui/footer/Footer'

describe('Footer', () => {
  it('renders footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeTruthy()
  })
})

