import { useEffect, useState } from "react";


export function useResponsive(breakpoint = 768) {

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(`(max-width:${breakpoint}px)`).matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width:${breakpoint}px)`);

    const handler = () => setIsMobile(mql.matches);

    handler();

    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
    
  }, [breakpoint]);


  return isMobile;
}
