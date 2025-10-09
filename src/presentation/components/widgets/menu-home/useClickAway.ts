import { useEffect } from "react";


export function useClickAway<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
  rootRef: React.RefObject<T | null>,
  anchorEl?: HTMLElement | null
) {
  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const insideMenu   = !!rootRef.current && !!target && rootRef.current.contains(target);
      const insideAnchor = !!anchorEl && !!target && anchorEl.contains(target);
      if (insideMenu || insideAnchor) return; // no cerrar
      onClose();
    };


    const tid = window.setTimeout(() => {
      document.addEventListener("pointerdown", onDocPointerDown);
    }, 0);

    return () => {
      window.clearTimeout(tid);
      document.removeEventListener("pointerdown", onDocPointerDown);
    };
  }, [open, onClose, rootRef, anchorEl]);
}
