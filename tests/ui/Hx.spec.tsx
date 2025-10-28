import React from 'react'
import { render, screen } from '../test-utils'

import H1 from '../../src/presentation/components/ui/H1/H1'
import H2 from '../../src/presentation/components/ui/H2/H2'
import H4 from '../../src/presentation/components/ui/H4/H4'
import H5 from '../../src/presentation/components/ui/H5/H5'
import H6 from '../../src/presentation/components/ui/H6/H6'

describe('Headings', () => {
  it('renders H1 text', () => {
    render(<H1>Title 1</H1>)
    expect(screen.getByText('Title 1')).toBeTruthy()
  })
  it('renders H2 text', () => {
    render(<H2>Title 2</H2>)
    expect(screen.getByText('Title 2')).toBeTruthy()
  })
  it('renders H4 text', () => {
    render(<H4>Title 4</H4>)
    expect(screen.getByText('Title 4')).toBeTruthy()
  })
  it('renders H5 text', () => {
    render(<H5>Title 5</H5>)
    expect(screen.getByText('Title 5')).toBeTruthy()
  })
  it('renders H6 text', () => {
    render(<H6>Title 6</H6>)
    expect(screen.getByText('Title 6')).toBeTruthy()
  })
})

