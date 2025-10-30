import React from 'react'
import { render, screen } from '../../test-utils'
import { useClickAway } from '../../../src/presentation/components/widgets/menu-home/useClickAway'

function TestComp({ open, onClose, anchorEl }: { open: boolean; onClose: () => void; anchorEl?: HTMLElement | null }) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  useClickAway(open, onClose, rootRef, anchorEl)
  return (
    <div>
      <div data-testid="root" ref={rootRef}>
        <button data-testid="inside">inside</button>
      </div>
      {/* outside area */}
      <div data-testid="outside">outside</div>
    </div>
  )
}

function firePointerDown(el: Element) {
  const ev = new Event('pointerdown', { bubbles: true }) as Event
  el.dispatchEvent(ev)
}

describe('useClickAway', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls onClose when clicking outside', () => {
    const onClose = vi.fn()
    render(<TestComp open={true} onClose={onClose} />)
    // wait for the setTimeout(0) that attaches the document listener
    vi.runAllTimers()
    const outside = screen.getByTestId('outside')
    firePointerDown(outside)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when clicking inside root', () => {
    const onClose = vi.fn()
    render(<TestComp open={true} onClose={onClose} />)
    vi.runAllTimers()
    const inside = screen.getByTestId('inside')
    firePointerDown(inside)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not close when clicking inside anchorEl', () => {
    const onClose = vi.fn()
    const anchor = document.createElement('button')
    anchor.setAttribute('data-testid', 'anchor')
    document.body.appendChild(anchor)
    render(<TestComp open={true} onClose={onClose} anchorEl={anchor} />)
    vi.runAllTimers()
    firePointerDown(anchor)
    expect(onClose).not.toHaveBeenCalled()
    document.body.removeChild(anchor)
  })

  it('does nothing when open=false', () => {
    const onClose = vi.fn()
    render(<TestComp open={false} onClose={onClose} />)
    vi.runAllTimers()
    const outside = screen.getByTestId('outside')
    firePointerDown(outside)
    expect(onClose).not.toHaveBeenCalled()
  })
})

