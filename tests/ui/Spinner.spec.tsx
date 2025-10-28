import React from 'react'
import { render, screen } from '../test-utils'
import { Spinner } from '../../src/presentation/components/ui/spinner'

describe('Spinner', () => {
  it('renders progressbar', () => {
    render(<Spinner />)
    expect(screen.getByRole('progressbar')).toBeTruthy()
  })
})

