import React from 'react'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { NotificationBellRow, type NotificationItem } from '../../src/presentation/components/widgets/nav-bar-launcher/components/NotificationBellRows'

describe('NotificationBellRow', () => {
  it('shows empty state when no items', () => {
    render(
      <NotificationBellRow titleLeft="Hoy" items={[]} />
    )
    expect(screen.getByText(/Sin notificaciones/i)).toBeTruthy()
  })

  it('renders items with title and description', () => {
    const items: NotificationItem[] = [
      { id: 1, notificationTypeId: 1, title: 'Welcome', description: 'Desc', read: false, cta: { title: 'Go', href: '#' } },
    ]
    render(<NotificationBellRow titleLeft="Hoy" items={items} />)

    // Header is rendered; click to expand the accordion details
    fireEvent.click(screen.getByText('Welcome'))

    expect(screen.getByText('Desc')).toBeTruthy()
    return waitFor(() => {
      expect(screen.getByRole('link', { name: 'Go' })).toBeTruthy()
    })
  })
})
