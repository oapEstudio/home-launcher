import React from 'react'
import { render, screen } from '../test-utils'
import { CustomBox } from '../../src/presentation/components/ui/box/CustomBox'

describe('CustomBox', () => {
  it('renders children', () => {
    render(<CustomBox><div>Content</div></CustomBox>)
    expect(screen.getByText('Content')).toBeTruthy()
  })
})

