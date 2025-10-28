import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import { useForm } from 'react-hook-form'
import { CustomSwitchContainer } from '../../../src/presentation/components/ui/inputs/switch'

function Wrapper() {
  const { control } = useForm({ defaultValues: { active: false } })
  return <CustomSwitchContainer control={control as any} name="active" />
}

describe('CustomSwitchContainer', () => {
  it('toggles label between Inactiva/Activa', () => {
    render(<Wrapper />)
    expect(screen.getByText('Inactiva')).toBeTruthy()
    const cb = screen.getByRole('checkbox')
    fireEvent.click(cb)
    expect(screen.getByText('Activa')).toBeTruthy()
  })
})
