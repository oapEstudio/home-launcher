import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import { LauncherHamburgerButton } from '../../src/presentation/components/widgets/menu-home/LauncherMenuHamburguesaButton'
import { vi } from 'vitest'

describe('LauncherHamburgerButton', () => {
  it('calls onToggle when not syncing', () => {
    const onToggle = vi.fn()
    render(<LauncherHamburgerButton pressed={false} sync={false} onToggle={onToggle} />)
    const button = screen.getByRole('button', { name: /Men/i })
    fireEvent.click(button)
    expect(onToggle).toHaveBeenCalled()
  })

  it('does not toggle when sync is true', () => {
    const onToggle = vi.fn()
    render(<LauncherHamburgerButton pressed={false} sync={true} onToggle={onToggle} />)
    const button = screen.getByRole('button', { name: /Men/i })
    fireEvent.click(button)
    expect(onToggle).not.toHaveBeenCalled()
  })
})

