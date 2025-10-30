import React from 'react'
import { render, screen } from '../test-utils'
import { ContainerSlideTitle } from '../../src/presentation/components/widgets/carousel/components/ContainerSlideTitle'

describe('ContainerSlideTitle', () => {
  it('renders title and subtitle', () => {
    render(
      <ContainerSlideTitle
        height={300}
        title="Main Title"
        subtitle="Sub Title"
      />
    )
    expect(screen.getByText('Main Title')).toBeTruthy()
    expect(screen.getByText('Sub Title')).toBeTruthy()
  })

  it('renders CTA when provided', () => {
    render(
      <ContainerSlideTitle
        height={300}
        title="A"
        subtitle="B"
        button={{ label: 'Learn more', href: 'https://example.com', target: '_blank' }}
      />
    )
    const link = screen.getByRole('link', { name: 'Learn more' }) as HTMLAnchorElement
    expect(link).toBeTruthy()
    expect(link.href).toContain('https://example.com')
  })
})

