import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import { LauncherMenu } from '../../src/presentation/components/widgets/menu-home/LauncherMenu'
import type { NavItem } from '../../src/presentation/components/widgets/menu-home/types'
import { vi } from 'vitest';

function mockMatchMedia(matches: boolean) {
  // @ts-ignore
  window.matchMedia = (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => true,
  }) as any
}

const data: NavItem[] = [
  { id: 'one', label: 'One', href: 'https://example.com' },
  { id: 'two', label: 'Two', items: [
    { id: 'two-a', label: 'Two A', href: 'https://example.com/a' }
  ] }
]

describe('LauncherMenu', () => {
  it('renders DesktopFlyoutMenu on desktop and opens leaf', () => {
    mockMatchMedia(false)
    const onClose = vi.fn()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null as any)
    render(<LauncherMenu data={data} open onClose={onClose} />)
    expect(screen.getByLabelText(/Men/)).toBeTruthy()
    fireEvent.click(screen.getByText('One'))
    expect(openSpy).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
    openSpy.mockRestore()
  })

  it('renders MobileStackMenu on mobile', () => {
    mockMatchMedia(true)
    render(<LauncherMenu data={data} open onClose={() => {}} />)
    // should show top-level labels
    expect(screen.getByText('One')).toBeTruthy()
    expect(screen.getByText('Two')).toBeTruthy()
  })

  it('applies hidden attributes when closed', () => {
    mockMatchMedia(false)
    const { container } = render(<LauncherMenu data={data} open={false} onClose={() => {}} />)
    const root = container.querySelector('.launcherMenu') as HTMLDivElement
    expect(root).toBeTruthy()
    expect(root.className).toMatch(/isHidden/)
    expect(root.getAttribute('aria-hidden')).toBe('true')
  })
})

