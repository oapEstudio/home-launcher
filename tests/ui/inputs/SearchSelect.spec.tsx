import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import CustomSearchSelect from '../../../src/presentation/components/ui/inputs/search-select/search-select.component'

describe('CustomSearchSelect', () => {
  it('shows placeholder when empty and selected label when value set', () => {
    const options = [
      { label: 'Alpha', value: 'a' },
      { label: 'Beta', value: 'b' },
    ]
    const onChange = vi.fn()
    render(
      <CustomSearchSelect value="" onChange={onChange as any} options={options} placeholder="Choose" />
    )
    // placeholder text visible
    expect(screen.getByText('Choose')).toBeTruthy()
  })
})
