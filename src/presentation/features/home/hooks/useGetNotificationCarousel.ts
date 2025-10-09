import { useContext, useEffect, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../application/common/IPaginatedResponse";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IMenuHome } from "../../../../domain/entities/IMenuHome";
import type { INotificationCarousel } from "../../../../domain/entities/ISlide";

export function useGetNotificationCarousel(
  initialParams: IPageParameters
) {
  const {getNotificationCarousel} = useContext(DependencyContext);
  const [params, setParams] = useState<IPageParameters>(initialParams);
  const [result, setResult] = useState<IPaginatedResponse<INotificationCarousel> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<Error | null>(null);


  useEffect(() => {

    setLoading(true);

    getNotificationCarousel.execute(params)
      .then(res => setResult(res))
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
      
  }, [params, getNotificationCarousel]);

  return { result, loading, error, params, setParams };
}