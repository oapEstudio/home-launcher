import React from 'react'
import { render, screen } from '../test-utils'
import { Carousel } from '../../src/presentation/components/widgets/carousel/Carousel'

const makeSlides = (n: number) => Array.from({ length: n }).map((_, i) => ({
  id: `s${i}`,
  title: `Slide ${i}`,
  imageUrl: `https://example.com/img${i}.png`,
  subtitle: `Sub ${i}`,
  cta: { label: 'Go', href: '#' },
  order: i,
  isActive: true,
}))

describe('Carousel', () => {
  it('renders null if no active slides', () => {
    const { container } = render(<Carousel slides={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a single slide without arrows', () => {
    const slides = makeSlides(1)
    const { container } = render(<Carousel slides={slides} />)
    expect(screen.getByText('Slide 0')).toBeTruthy()
    expect(screen.queryByRole('button', { name: /Anterior/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /Siguiente/i })).toBeNull()
  })

  it('renders arrows when multiple slides', () => {
    const slides = makeSlides(3)
    render(<Carousel slides={slides} />)
    expect(screen.getByRole('button', { name: /Anterior/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Siguiente/i })).toBeTruthy()
  })
})

