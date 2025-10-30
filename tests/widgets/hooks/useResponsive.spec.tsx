import { renderHook, act } from '@testing-library/react'
import { useResponsive } from '../../../src/presentation/components/widgets/menu-home/useResponsive'

describe('useResponsive', () => {
  function mockMatchMedia(initialMatches: boolean) {
    let lastMql: any
    // @ts-ignore
    window.matchMedia = vi.fn().mockImplementation((query: string) => {
      const listeners: Array<(e?: any) => void> = []
      lastMql = {
        media: query,
        matches: initialMatches,
        addEventListener: (_: string, cb: (e?: any) => void) => listeners.push(cb),
        removeEventListener: (_: string, cb: (e?: any) => void) => {
          const i = listeners.indexOf(cb)
          if (i >= 0) listeners.splice(i, 1)
        },
        addListener: (_cb: any) => {},
        removeListener: (_cb: any) => {},
        dispatchEvent: () => true,
        _listeners: listeners,
      }
      return lastMql
    }) as any
    return {
      get mql() { return lastMql },
      setMatches(val: boolean) {
        lastMql.matches = val
        lastMql._listeners.forEach((cb: any) => cb({ matches: val }))
      },
    }
  }

  it('returns initial state based on matchMedia', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useResponsive(768))
    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    const control = mockMatchMedia(false)
    const { result } = renderHook(() => useResponsive(600))
    expect(result.current).toBe(false)
    act(() => {
      control.setMatches(true)
    })
    expect(result.current).toBe(true)
  })
})

