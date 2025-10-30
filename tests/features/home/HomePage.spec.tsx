import React from 'react'
import { render, screen } from '../../test-utils'

// Mock child components to make assertions on props without heavy UI
vi.mock('../../../src/presentation/components/widgets/carousel/Carousel', () => ({
  Carousel: ({ slides }: any) => (
    <div data-testid="carousel" data-count={slides?.length}>{slides?.[0]?.title}</div>
  )
}))

vi.mock('../../../src/presentation/components/widgets/relevant-applications/RelevantApplications', () => ({
  default: ({ items }: any) => (
    <div data-testid="relevant">{items?.length} items</div>
  )
}))

// Mock hook
vi.mock('../../../src/presentation/features/home/hooks/useHomePage', () => ({
  useHomePage: vi.fn(),
}))

import { useHomePage } from '../../../src/presentation/features/home/hooks/useHomePage'
import { HomePage } from '../../../src/presentation/features/home/HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const makeCarouselItem = (id: number) => ({
    notificationTypeId: id,
    slideName: `s${id}`,
    title: `Title ${id}`,
    description: `Desc ${id}`,
    imagenLink: `https://example.com/${id}.png`,
    buttonText: 'Go',
    buttonLink: '#',
    dateUpdated: new Date(),
  })

  it('renders Carousel and RelevantApplications when not loading', () => {
    ;(useHomePage as any).mockReturnValue({
      resultHighlighted: { data: [{ title: 'HL', description: 'd', link: '#', hierarchyIndex: 1 }], count: 1 },
      loadingHighlighted: false,
      resultCarousel: { data: [makeCarouselItem(1), makeCarouselItem(2)], count: 2 },
      loadingCarousel: false,
    })

    render(<HomePage />)
    // Carousel shows first slide title via our mock
    const carousel = screen.getByTestId('carousel') as HTMLElement
    expect(carousel.getAttribute('data-count')).toBe('2')
    expect(screen.getByText('Title 1')).toBeTruthy()
    // RelevantApplications mock receives mapped quick links
    const relevant = screen.getByTestId('relevant') as HTMLElement
    expect(relevant.textContent || '').toContain('1 items')
  })

  it('shows skeleton instead of Carousel while loadingCarousel', () => {
    ;(useHomePage as any).mockReturnValue({
      resultHighlighted: { data: [{ title: 'HL', description: 'd', link: '#', hierarchyIndex: 1 }], count: 1 },
      loadingHighlighted: false,
      resultCarousel: null,
      loadingCarousel: true,
    })
    render(<HomePage />)
    expect(screen.queryByTestId('carousel')).toBeNull()
  })

  it('shows skeleton instead of RelevantApplications while loadingHighlighted', () => {
    ;(useHomePage as any).mockReturnValue({
      resultHighlighted: null,
      loadingHighlighted: true,
      resultCarousel: { data: [makeCarouselItem(1)], count: 1 },
      loadingCarousel: false,
    })
    render(<HomePage />)
    expect(screen.getByTestId('carousel')).toBeTruthy()
    expect(screen.queryByTestId('relevant')).toBeNull()
  })
})
