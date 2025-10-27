import { useContext, useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";

import type { INotificationAlert } from "../../../../domain/entities/IAlert";

export function useGetNotificationAlert(
  initialParams: IPageParameters
) {
  const {getNotificationAlert} = useContext(DependencyContext);
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<INotificationAlert> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);


  useEffect(() => {

    setLoading(true);

    getNotificationAlert.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
      
  }, [params, getNotificationAlert]);

  return { result, loading, error, params, setParams };
}