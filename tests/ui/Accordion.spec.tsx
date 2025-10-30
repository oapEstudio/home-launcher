import React from 'react'
import { render, screen } from '../test-utils'
import { CustomAccordion, CustomPersonalityAccordion } from '../../src/presentation/components/ui/accordion/Accordion'

describe('Accordion', () => {
  it('renders CustomAccordion title and content', () => {
    render(<CustomAccordion title="My Title" content={<div>Body</div>} />)
    expect(screen.getByText('My Title')).toBeTruthy()
    expect(screen.getByText('Body')).toBeTruthy()
  })

  it('renders CustomPersonalityAccordion header and details', () => {
    render(<CustomPersonalityAccordion header={<span>Header</span>} details={<span>Details</span>} />)
    expect(screen.getByText('Header')).toBeTruthy()
    expect(screen.getByText('Details')).toBeTruthy()
  })
})

