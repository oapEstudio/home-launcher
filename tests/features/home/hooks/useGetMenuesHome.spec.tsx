import { renderHook, waitFor } from '@testing-library/react'
import { useGetMenuesHome } from '../../../../src/presentation/features/home/hooks/useGetMenuesHome'
import type { IPaginatedResponse, IPageParameters } from '../../../../src/application/common/IPaginatedResponse'
import type { IMenuHome } from '../../../../src/domain/entities/IMenuHome'
import { createDeps, withDeps } from './test-helpers'

describe('useGetMenuesHome', () => {
  const params: IPageParameters = { page: 1, pageSize: 5, sortBy: '', sortDescending: true }
  it('loads result', async () => {
    const resp: IPaginatedResponse<IMenuHome> = { data: [{ id:'1', name:'n', description:'d', parentId: null, link:'#', hasLink:true, orderIndex:1, children: [] }], count: 1, parameters: params }
    const getMenuesHome = { execute: vi.fn().mockResolvedValue(resp) }
    const deps = createDeps({ getMenuesHome })
    const wrapper = withDeps(deps)
    const { result } = renderHook(() => useGetMenuesHome(params), { wrapper })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.result).toEqual(resp)
  })
})

