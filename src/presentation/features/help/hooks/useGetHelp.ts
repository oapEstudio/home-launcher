import { useContext, useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IHelp } from "../../../../domain/entities/IHelp";

export function useGetHelp(
  initialParams: IPageParameters
) {
  const {getHelp} = useContext(DependencyContext);
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<IHelp> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);


  useEffect(() => {

    setLoading(true);

    getHelp.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
      
  }, [params, getHelp]);

  return { result, loading, error, params, setParams };
}