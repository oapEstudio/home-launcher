import { renderHook, waitFor } from '@testing-library/react'
import { useGetHighlighted } from '../../../../src/presentation/features/home/hooks/useGetHighlighted'
import type { IPaginatedResponse, IPageParameters } from '../../../../src/application/common/IPaginatedResponse'
import type { IHighlight } from '../../../../src/domain/entities/IHighlight'
import { createDeps, withDeps } from './test-helpers'

describe('useGetHighlighted', () => {
  const params: IPageParameters = { page: 1, pageSize: 5, sortBy: '', sortDescending: true }
  it('loads result', async () => {
    const resp: IPaginatedResponse<IHighlight> = { data: [{ title: 't', description: 'd', link: '#', hierarchyIndex: 1 }], count: 1, parameters: params }
    const getHighlighteds = { execute: vi.fn().mockResolvedValue(resp) }
    const deps = createDeps({ getHighlighteds })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useGetHighlighted(params), { wrapper })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.result).toEqual(resp)
  })
})

