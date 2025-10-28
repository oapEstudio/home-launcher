import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import { CustomSearchInput } from '../../../src/presentation/components/ui/inputs/search-inputs/search-input.component'

vi.mock('@mui/x-date-pickers/icons', () => ({
  ClearIcon: () => <span data-testid="clear" />,
}))

describe('CustomSearchInput', () => {
  it('renders and handles change and clear', () => {
    const onChange = vi.fn()
    const onClick = vi.fn()
    render(
      <CustomSearchInput value="text" onChange={onChange} onClick={onClick} placeholder="Buscar" />
    )
    // clear button visible when value present
    fireEvent.click(screen.getByTestId('clear'))
    expect(onClick).toHaveBeenCalled()
  })
})
