import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import { useForm } from 'react-hook-form'
import { CustomCheckboxInput } from '../../../src/presentation/components/ui/inputs/checkbox/checkbox.component'

function Wrapper() {
  const { control } = useForm({ defaultValues: { agree: false } })
  return (
    <CustomCheckboxInput
      label="Accept"
      control={control}
      name="agree"
      disable={false}
      description="desc"
    />
  )
}

describe('CustomCheckboxInput', () => {
  it('renders label and toggles value', () => {
    render(<Wrapper />)
    expect(screen.getByText('desc')).toBeTruthy()
    const cb = screen.getByRole('checkbox') as HTMLInputElement
    expect(cb.checked).toBe(false)
    fireEvent.click(cb)
    expect(cb.checked).toBe(true)
  })
})
