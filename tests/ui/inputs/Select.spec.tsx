import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import CustomSelect from '../../../src/presentation/components/ui/inputs/select/select.component'

describe('CustomSelect (uncontrolled branch)', () => {
  it('renders options and handles change', () => {
    const onChange = vi.fn()
    render(
      <CustomSelect
        options={[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]}
        value={''}
        onChange={onChange as any}
      />
    )
    // Open the select menu (MUI Select trigger has aria-haspopup="listbox")
    const trigger = (document.querySelector('[aria-haspopup="listbox"]') as HTMLElement) || (screen.queryByRole('button') as HTMLElement)
    expect(trigger).toBeTruthy()
    fireEvent.mouseDown(trigger)
    const opt = screen.getByRole('option', { name: 'One' })
    fireEvent.click(opt)
    expect(onChange).toHaveBeenCalled()
  })
})
