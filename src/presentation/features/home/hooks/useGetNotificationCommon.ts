import { useContext, useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";

import type { INotificationCommon } from "../../../../domain/entities/INotificationCommon";

export function useGetNotificationCommon(
  initialParams: IPageParameters
) {
  const {getNotificationCommon} = useContext(DependencyContext);
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<INotificationCommon> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);


  useEffect(() => {

    setLoading(true);

    getNotificationCommon.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
      
  }, [params, getNotificationCommon]);

  return { result, loading, error, params, setParams };
}