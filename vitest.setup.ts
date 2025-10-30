// Fetch polyfill
import 'whatwg-fetch'
import { vi } from 'vitest'

// Minimal IntersectionObserver mock for jsdom environment
class MockIntersectionObserver {
  private _callback: IntersectionObserverCallback
  root: Element | Document | null
  rootMargin: string
  thresholds: ReadonlyArray<number>

  static lastInstance: MockIntersectionObserver | null = null

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this._callback = callback
    this.root = (options && options.root) || null
    this.rootMargin = (options && options.rootMargin) || ''
    const t = (options && options.threshold) || 0
    this.thresholds = Array.isArray(t) ? t : [t]
    MockIntersectionObserver.lastInstance = this
  }
  observe() {/* no-op */}
  unobserve() {/* no-op */}
  disconnect() {/* no-op */}
  takeRecords(): IntersectionObserverEntry[] { return [] }

  // helper to simulate intersection in tests
  trigger(isIntersecting = true) {
    const entry = [{ isIntersecting } as unknown as IntersectionObserverEntry]
    this._callback(entry, this as unknown as IntersectionObserver)
  }
}

// @ts-ignore
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Silence modules that depend on Canvas or browser-only APIs during tests
vi.mock('react-lottie', () => ({ default: () => null }))
// Mock MUI X date pickers icons used in ArrowsSlide (avoid environment-specific issues)
vi.mock('@mui/x-date-pickers', () => ({
  ArrowLeftIcon: () => null,
  ArrowRightIcon: () => null,
}))
