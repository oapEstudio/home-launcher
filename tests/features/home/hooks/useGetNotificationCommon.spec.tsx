import { renderHook, waitFor } from '@testing-library/react'
import { useGetNotificationCommon } from '../../../../src/presentation/features/home/hooks/useGetNotificationCommon'
import type { IPaginatedResponse, IPageParameters } from '../../../../src/application/common/IPaginatedResponse'
import type { INotificationCommon } from '../../../../src/domain/entities/INotificationCommon'
import { createDeps, withDeps } from './test-helpers'

describe('useGetNotificationCommon', () => {
  const params: IPageParameters = { page: 1, pageSize: 10, sortBy: '', sortDescending: true }

  it('loads data successfully', async () => {
    const resp: IPaginatedResponse<INotificationCommon> = {
      data: [{
        notificationTypeId: 1,
        name: 'n',
        title: 't',
        buttonText: 'b',
        buttonLink: 'l',
        description: 'd',
        notificationCommonTypeId: 1,
        notificationCommonType: 'type',
        dateUpdated: new Date(),
        read: false,
      }],
      count: 1,
      parameters: params,
    }
    const getNotificationCommon = { execute: vi.fn().mockResolvedValue(resp) }
    const deps = createDeps({ getNotificationCommon })
    const wrapper = withDeps(deps)

    const { result } = renderHook(() => useGetNotificationCommon(params), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(getNotificationCommon.execute).toHaveBeenCalledWith(params)
    expect(result.current.result).toEqual(resp)
    expect(result.current.error).toBeNull()
  })

  it('handles error', async () => {
    const getNotificationCommon = { execute: vi.fn().mockRejectedValue(new Error('boom')) }
    const deps = createDeps({ getNotificationCommon })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useGetNotificationCommon(params), { wrapper })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.result).toBeNull()
    expect(result.current.error).toBeInstanceOf(Error)
  })
})

