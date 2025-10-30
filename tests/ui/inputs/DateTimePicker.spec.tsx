import React from 'react'
import { render, screen } from '../../test-utils'

vi.mock('@mui/x-date-pickers/DateTimePicker', () => ({
  DateTimePicker: () => <div data-testid="dtp" />,
}))
vi.mock('@mui/x-date-pickers', () => ({
  LocalizationProvider: ({ children }: any) => <div>{children}</div>,
}))
vi.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }: any) => <div data-testid="lp">{children}</div>,
}))
vi.mock('@mui/x-date-pickers/AdapterDayjs', () => ({ AdapterDayjs: function Adapter() {} }))
vi.mock('@mui/x-date-pickers/internals/demo', () => ({
  DemoContainer: ({ children }: any) => <div data-testid="demo">{children}</div>,
}))

import CustomDateTimePicker from '../../../src/presentation/components/ui/inputs/date-time-input/date-time-input.component'
import { useForm } from 'react-hook-form'

function Wrapper() {
  const { control } = useForm({ defaultValues: { dt: '' } })
  return (
    <CustomDateTimePicker size="small" control={control as any} name="dt" label="FechaHora" required />
  )
}

describe('CustomDateTimePicker', () => {
  it('renders DemoContainer and DateTimePicker', () => {
    render(<Wrapper />)
    expect(screen.getByText('FechaHora')).toBeTruthy()
    expect(screen.getByTestId('demo')).toBeTruthy()
    expect(screen.getByTestId('dtp')).toBeTruthy()
  })
})
