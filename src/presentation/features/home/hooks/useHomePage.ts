import { useGetHighlighted } from "./useGetHighlighted";
import { useGetNotificationCarousel } from "./useGetNotificationCarousel";

export function useHomePage(){
    
     const { result: resultHighlighted, loading: loadingHighlighted, params: paramsHighlighted, setParams: setParamsHighlighted, error: errorHighlighted } = useGetHighlighted(
       {
         page: 1, pageSize: 1000,sortBy: '', sortDescending: true
       }
     );

       const {result: resultCarousel, loading: loadingCarousel} = useGetNotificationCarousel({
         page: 1, pageSize: 1000,sortBy: '', sortDescending: true
       });

     return {
        resultHighlighted,
        loadingHighlighted,
        resultCarousel,
        loadingCarousel
     }
}