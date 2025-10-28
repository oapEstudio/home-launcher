import { act, renderHook } from '@testing-library/react'
import { useUpdateNotification } from '../../../../src/presentation/features/home/hooks/useUpdateNotification'
import type { INotificationCommon } from '../../../../src/domain/entities/INotificationCommon'
import { createDeps, withDeps } from './test-helpers'

describe('useUpdateNotification', () => {
  it('calls update and returns value', async () => {
    const value = { } as unknown as INotificationCommon
    const updateNotificationCommon = { execute: vi.fn().mockResolvedValue(value) }
    const deps = createDeps({ updateNotificationCommon })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useUpdateNotification(), { wrapper })

    let ret: any
    await act(async () => {
      ret = await result.current.update()
    })
    expect(updateNotificationCommon.execute).toHaveBeenCalled()
    expect(ret).toBe(value)
    expect(result.current.error).toBeNull()
  })

  it('propagates error', async () => {
    const updateNotificationCommon = { execute: vi.fn().mockRejectedValue(new Error('bad')) }
    const deps = createDeps({ updateNotificationCommon })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useUpdateNotification(), { wrapper })

    await expect(async () => {
      await act(async () => { await result.current.update() })
    }).rejects.toThrow()
  })
})

