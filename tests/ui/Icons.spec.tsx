import React from 'react'
import { render, screen } from '../test-utils'
import { DangerIcon, SuccessIcon, WhatsAppIcon, UserAvatar } from '../../src/presentation/components/ui/icons'

describe('Icons', () => {
  it('renders danger and success icons', () => {
    const { container } = render(<div><DangerIcon /><SuccessIcon /></div>)
    expect(container.firstChild).toBeTruthy()
  })

  it('renders WhatsAppIcon as img', () => {
    render(<WhatsAppIcon />)
    expect(screen.getByRole('img')).toBeTruthy()
  })

  it('renders UserAvatar', () => {
    const { container } = render(<UserAvatar />)
    expect(container.querySelector('img')).toBeTruthy()
  })
})

