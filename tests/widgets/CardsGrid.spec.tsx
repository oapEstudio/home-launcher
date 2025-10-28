import React from 'react'
import { render, screen } from '../test-utils'
import { CardsGrid } from '../../src/presentation/components/widgets/relevant-applications/components/CardsGrid'

describe('CardsGrid', () => {
  it('renders children in grid', () => {
    render(
      <CardsGrid>
        <div>Card 1</div>
        <div>Card 2</div>
      </CardsGrid>
    )
    expect(screen.getByText('Card 1')).toBeTruthy()
    expect(screen.getByText('Card 2')).toBeTruthy()
  })
})

