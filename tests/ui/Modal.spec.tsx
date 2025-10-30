import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import CustomModal from '../../src/presentation/components/ui/modal/modal.component'

describe('CustomModal', () => {
  it('renders and handles actions', () => {
    const onClose = vi.fn()
    const onOk = vi.fn()
    render(
      <CustomModal
        open
        onClose={onClose}
        onOk={onOk}
        onCancel={onClose}
        maxWidth="md"
        disabled={false}
      >
        <div>Body</div>
      </CustomModal>
    )
    expect(screen.getByText('Body')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Aceptar/i }))
    expect(onOk).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }))
    expect(onClose).toHaveBeenCalled()
  })
})

