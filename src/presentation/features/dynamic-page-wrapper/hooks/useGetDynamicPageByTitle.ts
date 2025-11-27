import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { IDynamicPage } from '../../../../domain/entities/IDynamicPage';

export function useGetDynamicPageByTitle() {
  const { getDynamicPageByTitle } = useContext(DependencyContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchById = useCallback(async (id: string): Promise<IDynamicPage> => {
    setLoading(true);
    setError(null);
    try {
      const n = await getDynamicPageByTitle.execute(id);
      return n;
    } catch (e: any) {
      console.log("Error",e)
      setError(e?.message ?? 'Error al obtener la página');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [getDynamicPageByTitle]);

  return { fetchById, loading, error };
}

