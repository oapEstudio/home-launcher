import React from 'react'
import { render, screen } from '../test-utils'
import { LoadingContainer } from '../../src/presentation/components/widgets/loading-container/LoadingContainer'

describe('LoadingContainer', () => {
  it('renders a progress indicator', () => {
    render(<LoadingContainer />)
    expect(screen.getByRole('progressbar')).toBeTruthy()
  })
})

