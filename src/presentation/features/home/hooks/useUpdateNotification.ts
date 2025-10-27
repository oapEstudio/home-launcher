import { useCallback, useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { INotificationCommon } from '../../../../domain/entities/INotificationCommon';

export function useUpdateNotification(){
  const { updateNotificationCommon } = useContext(DependencyContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (): Promise<INotificationCommon> => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await updateNotificationCommon.execute();
      return res;
    } catch (e: any) {
      setError(e?.message ?? 'Error al actualizar la notificación');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [updateNotificationCommon]);

  return { update, loading, error };
}

