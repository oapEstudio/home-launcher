import React from 'react'
import { render, screen } from '../../test-utils'
import BlankCard from '../../../src/presentation/components/ui/card/blank'

describe('BlankCard', () => {
  it('renders children content', () => {
    render(
      <BlankCard>
        <div>Inner</div>
      </BlankCard>
    )
    expect(screen.getByText('Inner')).toBeTruthy()
  })

  it('forwards className to Card root', () => {
    const { container } = render(
      <BlankCard className="custom-class">
        <div>Content</div>
      </BlankCard>
    )
    const el = container.querySelector('.custom-class') as HTMLElement
    expect(el).toBeTruthy()
    // MUI applies base class to root
    expect(el.className).toMatch(/MuiCard-root/)
  })
})
