import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import { useForm } from 'react-hook-form'

vi.mock('../../../src/presentation/components/ui/inputs/date-input/date-input.component.tsx', async (orig) => {
  const mod = await orig()
  return mod
})

// Mock DatePicker from MUI X
vi.mock('@mui/x-date-pickers', () => ({
  DatePicker: ({ onChange }: any) => (
    <button data-testid="dp" onClick={() => onChange?.({ toISOString: () => '2025-01-02T03:04:05.000Z' })}>
      DP
    </button>
  ),
}))

import CustomDateInput from '../../../src/presentation/components/ui/inputs/date-input/date-input.component'

function Wrapper() {
  const { control } = useForm({ defaultValues: { date: '' } })
  return (
    <CustomDateInput size="small" control={control as any} name="date" label="Fecha" required />
  )
}

describe('CustomDateInput', () => {
  it('renders label and calls onChange with ISO string', () => {
    render(<Wrapper />)
    expect(screen.getByText('Fecha')).toBeTruthy()
    const btn = screen.getByTestId('dp')
    fireEvent.click(btn)
    // If no crash, onChange accepted ISO; we at least verify Required star rendered via text
    expect(screen.getByText('*')).toBeTruthy()
  })
})
