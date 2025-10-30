import React from 'react'
import { render, screen } from '../test-utils'
import Container from '../../src/presentation/components/ui/container'

describe('Container', () => {
  it('renders children without infinity scroll', () => {
    render(
      <Container title="Test" description="desc">
        <div>Inner</div>
      </Container>
    )
    expect(screen.getByText('Inner')).toBeTruthy()
  })

  it('renders children with infinity scroll and can trigger fetch', () => {
    const fetchMore = vi.fn()
    render(
      <Container
        title="Test"
        description="desc"
        infinityScroll
        fetchMoreData={fetchMore}
        hasMore
        isLoading={false}
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Container>
    )

    // Use the global mock to simulate intersection
    const IO: any = (global as any).IntersectionObserver
    IO.lastInstance?.trigger(true)
    expect(fetchMore).toHaveBeenCalled()
  })
})

