import { renderHook, waitFor } from '@testing-library/react'
import { useHomePage } from '../../../../src/presentation/features/home/hooks/useHomePage'
import type { IPaginatedResponse, IPageParameters } from '../../../../src/application/common/IPaginatedResponse'
import type { IHighlight } from '../../../../src/domain/entities/IHighlight'
import type { INotificationCarousel } from '../../../../src/domain/entities/ISlide'
import { createDeps, withDeps } from './test-helpers'

describe('useHomePage', () => {
  it('aggregates highlighted and carousel results', async () => {
    const params: IPageParameters = { page: 1, pageSize: 1000, sortBy: '', sortDescending: true }
    const highlighted: IPaginatedResponse<IHighlight> = { data: [{ title:'t', description:'d', link:'#', hierarchyIndex:1 }], count: 1, parameters: params }
    const carousel: IPaginatedResponse<INotificationCarousel> = { data: [{ notificationTypeId:1, slideName:'s', title:'t', description:'d', imagenLink:'', buttonText:'b', buttonLink:'#', dateUpdated: new Date()}], count: 1, parameters: params }
    const getHighlighteds = { execute: vi.fn().mockResolvedValue(highlighted) }
    const getNotificationCarousel = { execute: vi.fn().mockResolvedValue(carousel) }
    const deps = createDeps({ getHighlighteds, getNotificationCarousel })
    const wrapper = withDeps(deps)

    const { result } = renderHook(() => useHomePage(), { wrapper })

    await waitFor(() => expect(result.current.loadingHighlighted).toBe(false))
    await waitFor(() => expect(result.current.loadingCarousel).toBe(false))
    expect(result.current.resultHighlighted).toEqual(highlighted)
    expect(result.current.resultCarousel).toEqual(carousel)
  })
})

