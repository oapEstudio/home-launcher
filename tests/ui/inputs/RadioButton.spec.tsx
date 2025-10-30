import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import CustomRadioButton from '../../../src/presentation/components/ui/inputs/radio-button/radio-button.component'

describe('CustomRadioButton', () => {
  it('calls onChange with parsed value on select (uncontrolled)', () => {
    const onChange = vi.fn()
    render(
      <CustomRadioButton
        options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
        value={false}
        onChange={(val: any) => onChange(val)}
      />
    )
    fireEvent.click(screen.getByLabelText('Yes'))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
