import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import Button from '../../src/presentation/components/ui/button/button.component'

describe('Button', () => {
  it('renders title and handles click', () => {
    const onClick = vi.fn()
    render(<Button title="Click me" variant="primary" onClick={onClick} />)
    const btn = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

