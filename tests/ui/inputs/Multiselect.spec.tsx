import React from 'react'
import { render, screen } from '../../test-utils'
import CustomMultiselect from '../../../src/presentation/components/ui/inputs/multiselect/multiselect.component'

describe('CustomMultiselect', () => {
  it('renders input with label placeholder', () => {
    render(
      <CustomMultiselect
        options={[{ name: 'One', id: 1 }, { name: 'Two', id: 2 }]}
        label="Options"
        onChange={() => {}}
        value={[]}
      />
    )
    expect(screen.getByLabelText('Options')).toBeTruthy()
    expect(screen.getByPlaceholderText('Seleccione')).toBeTruthy()
  })
})
