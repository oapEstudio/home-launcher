import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import { ArrowsSlide } from '../../src/presentation/components/widgets/carousel/components/ArrowsSlide'
import { vi } from 'vitest'

describe('ArrowsSlide', () => {
  it('calls handlers on click', () => {
    const prev = vi.fn()
    const next = vi.fn()
    render(<ArrowsSlide arrowsAtEdges goPrev={prev} goNext={next} />)
    fireEvent.click(screen.getByRole('button', { name: /Anterior/i }))
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }))
    expect(prev).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledTimes(1)
  })
})

