import React from 'react'
import { render, screen } from '../../test-utils'

vi.mock('../../../src/presentation/components/ui/icons', () => ({
  LinkedinIcon: () => <span data-testid="linkedin" />,
}))

import { convertLinks } from '../../../src/presentation/utils/convertLinks'

describe('convertLinks', () => {
  it('renders an anchor with linkedin icon', () => {
    const href = 'https://linkedin.com/in/example'
    const { container } = render(<>{convertLinks(href)}</>)
    const a = container.querySelector('a') as HTMLAnchorElement
    expect(a).toBeTruthy()
    expect(a.href).toContain(href)
    expect(a.target).toBe('_BLANK')
    expect(screen.getByTestId('linkedin')).toBeTruthy()
  })
})

