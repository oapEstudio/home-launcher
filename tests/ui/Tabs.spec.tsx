import React from 'react'
import { render, screen, fireEvent } from '../test-utils'
import { CustomTabs } from '../../src/presentation/components/ui/tabs/CustomTabs'

describe('CustomTabs', () => {
  it('switches tabs on click', () => {
    render(
      <CustomTabs
        tabs={[
          { id: 0, label: 'Tab 1', element: <div>Content 1</div> },
          { id: 1, label: 'Tab 2', element: <div>Content 2</div> },
        ]}
      />
    )
    // Initially Tab 1 panel is visible
    const panel0 = document.getElementById('full-width-tabpanel-0') as HTMLDivElement
    const panel1 = document.getElementById('full-width-tabpanel-1') as HTMLDivElement
    expect(panel0 && panel0.hasAttribute('hidden')).toBe(false)
    expect(panel1 && panel1.hasAttribute('hidden')).toBe(true)

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(panel0 && panel0.hasAttribute('hidden')).toBe(true)
    expect(panel1 && panel1.hasAttribute('hidden')).toBe(false)
  })
})

