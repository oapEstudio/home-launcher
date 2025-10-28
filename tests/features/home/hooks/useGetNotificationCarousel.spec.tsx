import { renderHook, waitFor } from '@testing-library/react'
import { useGetNotificationCarousel } from '../../../../src/presentation/features/home/hooks/useGetNotificationCarousel'
import type { IPaginatedResponse, IPageParameters } from '../../../../src/application/common/IPaginatedResponse'
import type { INotificationCarousel } from '../../../../src/domain/entities/ISlide'
import { createDeps, withDeps } from './test-helpers'

describe('useGetNotificationCarousel', () => {
  const params: IPageParameters = { page: 1, pageSize: 5, sortBy: '', sortDescending: true }
  it('loads result', async () => {
    const resp: IPaginatedResponse<INotificationCarousel> = { data: [{ notificationTypeId:1, slideName:'s', title:'t', description:'d', imagenLink:'', buttonText:'b', buttonLink:'#', dateUpdated: new Date()}], count: 1, parameters: params }
    const getNotificationCarousel = { execute: vi.fn().mockResolvedValue(resp) }
    const deps = createDeps({ getNotificationCarousel })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useGetNotificationCarousel(params), { wrapper })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.result).toEqual(resp)
  })
})

