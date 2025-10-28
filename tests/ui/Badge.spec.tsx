import React from 'react'
import { render, screen } from '../test-utils'
import CustomBadge from '../../src/presentation/components/ui/badge/CustomBadge'

describe('CustomBadge', () => {
  it('renders children and count', () => {
    render(
      <CustomBadge count={5} color="primary">
        <span>Inbox</span>
      </CustomBadge>
    )
    expect(screen.getByText('Inbox')).toBeTruthy()
    // MUI Badge renders the count text
    expect(screen.getByText('5')).toBeTruthy()
  })
})

