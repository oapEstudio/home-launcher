import React from "react";
import "./launcherMenu.css";
import type { NavItem } from "./types";
import { useResponsive } from "./useResponsive";
import { useClickAway } from "./useClickAway";
import { DesktopFlyoutMenu } from "./DesktopFlyoutMenu";
import { MobileStackMenu } from "./MobileStackMenu";

export type LauncherMenuProps = {
  data: NavItem[];
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;   // ya estabas usando anchorEl
  breakpoint?: number;             // default 768
  className?: string;
};

export function LauncherMenu({
  data,
  open,
  onClose,
  anchorEl,
  breakpoint = 768,
  className
}: LauncherMenuProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const isMobile = useResponsive(breakpoint);

  useClickAway(open, onClose, rootRef, anchorEl);

  const [resetKey, setResetKey] = React.useState(0);
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (!prevOpen.current && open) {    
      setResetKey((k) => k + 1);
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`launcherMenu ${open ? "" : "isHidden"} ${className || ""}`}
      aria-hidden={!open}
      aria-label="Menú launcher"
    >
      <div className="menu-panels">
          {open && (
              <div className="menu-panels" key={resetKey}>
                  {isMobile ? (
                     <MobileStackMenu data={data} onClose={onClose} />
                   ) : (
                      <DesktopFlyoutMenu data={data} onClose={onClose} />
                  )}
              </div>
          )}
      </div>
    </div>
  );
}
