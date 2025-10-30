import React from 'react'
import { render, screen } from '../../test-utils'
import CustomTextAreaInput from '../../../src/presentation/components/ui/inputs/text-area-input/text-area-input.component'

describe('CustomTextAreaInput', () => {
  it('renders multiline input with given rows', () => {
    render(<CustomTextAreaInput value="hello" rows={4} />)
    const textarea = screen.getByDisplayValue('hello') as HTMLInputElement
    expect(textarea).toBeTruthy()
  })
})
