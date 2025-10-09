import { useContext, useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IMenuHome } from "../../../../domain/entities/IMenuHome";

export function useGetMenuesHome(
  initialParams: IPageParameters
) {
  const {getMenuesHome} = useContext(DependencyContext);
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IMenuHome> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);


  useEffect(() => {

    setLoading(true);

    getMenuesHome.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
      
  }, [params, getMenuesHome]);

  return { result, loading, error, params, setParams };
}