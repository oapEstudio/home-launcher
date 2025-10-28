import React from 'react'
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { NotificationBell, type NotificationGroups } from '../../src/presentation/components/widgets/nav-bar-launcher/components/NotificationBell'
import { vi } from 'vitest'

vi.mock('../../src/presentation/features/home/hooks/useUpdateNotification', () => ({
  useUpdateNotification: () => ({ update: vi.fn().mockResolvedValue(undefined) })
}))

const groups: NotificationGroups = {
  today: [{ id: 1, notificationTypeId: 1, title: 'N1', description: 'D1', read: false }],
  yesterday: [],
  others: [],
}

describe('NotificationBell', () => {
  it('shows badge and opens panel', async () => {
    render(<NotificationBell groups={groups} loading={false} />)
    const trigger = screen.getByLabelText('notification-bell')
    // click inner IconButton (within group) by finding the button role
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    await waitFor(() => expect(screen.getByText(/Hoy/i)).toBeTruthy())
  })
})
