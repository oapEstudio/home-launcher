import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import CustomTextInput from '../../../src/presentation/components/ui/inputs/text-input/text-input.component'

describe('CustomTextInput', () => {
  it('renders label and counter for uncontrolled input', () => {
    render(<CustomTextInput label="Name" value="abc" />)
    expect(screen.getByText('Name')).toBeTruthy()
    expect(screen.getByText(/3\/100/)).toBeTruthy()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<CustomTextInput value="" onChange={onChange as any} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.input(input, { target: { value: 'hi' } })
    expect(onChange).toHaveBeenCalled()
  })
})
