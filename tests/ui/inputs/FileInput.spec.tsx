import React from 'react'
import { render, screen, fireEvent } from '../../test-utils'
import InputFileUpload from '../../../src/presentation/components/ui/inputs/file-input/file-input.component'

vi.mock('../../../src/presentation/components/ui/icons', () => ({
  UploadToCloud: () => <span data-testid="upload-icon" />,
}))

describe('InputFileUpload', () => {
  it('renders button and triggers onChange on hidden input', () => {
    const onChange = vi.fn()
    render(<InputFileUpload onChange={onChange} />)
    const labelEl = screen.getByText(/ADJUNTAR ARCHIVO/i).closest('label') as HTMLLabelElement
    expect(labelEl).toBeTruthy()
    const input = labelEl.querySelector('input[type="file"]') as HTMLInputElement
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(onChange).toHaveBeenCalled()
  })
})
