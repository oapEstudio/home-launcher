import { renderHook, waitFor } from '@testing-library/react'
import { useGetNotificationAlert } from '../../../../src/presentation/features/home/hooks/useGetNotificationAlert'
import type { IPaginatedResponse, IPageParameters } from '../../../../src/application/common/IPaginatedResponse'
import type { INotificationAlert } from '../../../../src/domain/entities/IAlert'
import { createDeps, withDeps } from './test-helpers'

describe('useGetNotificationAlert', () => {
  const params: IPageParameters = { page: 1, pageSize: 5, sortBy: '', sortDescending: true }
  it('loads result', async () => {
    const resp: IPaginatedResponse<INotificationAlert> = { data: [{ notificationTypeId:1, name:'n', title:'t', description:'d', dateUpdated: new Date()}], count: 1, parameters: params }
    const getNotificationAlert = { execute: vi.fn().mockResolvedValue(resp) }
    const deps = createDeps({ getNotificationAlert })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useGetNotificationAlert(params), { wrapper })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.result).toEqual(resp)
  })
})

