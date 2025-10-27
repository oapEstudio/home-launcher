import { forwardRef } from "react";
import { SyncIconn } from "../../ui/icons";
import ButtonGroup from "@mui/material/ButtonGroup";

export interface ILauncherHamburgerButtonProps{ 
  pressed: boolean; 
  sync: boolean;
  onToggle: () => void; 
  label?: string }

  const Hamburger = ({ pressed, onToggle, label = "Menú", sync = false }: ILauncherHamburgerButtonProps, ref: any)=> {
  
    return (
    <ButtonGroup variant="contained">
          <button
                ref={ref}
                type="button"
                aria-label={label}
                aria-expanded={pressed}
                aria-haspopup="menu"
                onClick={(e) => {
                  if(sync) return true;
                  e.stopPropagation();
                  onToggle();
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
          >

            {
              sync? <SyncIconn /> : 
                    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
                      <path d="M0 1h20M0 7h20M0 13h20" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                    </svg>
            }
            
            
          </button>
    </ButtonGroup>
  );
}
export const LauncherHamburgerButton = forwardRef<HTMLButtonElement,ILauncherHamburgerButtonProps>(Hamburger);

