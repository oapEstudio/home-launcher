import { List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import Divider from "../../../../components/ui/divider";
import React from "react";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { Sidebar } from "../layout/Sidebar";


interface MobileMenuViewProps {
  onSectionClick: (sectionId: string) => void;
  helpSections: IHelp[],
  section?: IHelp
}



export const MobileMenuView: React.FC<MobileMenuViewProps> = ({ onSectionClick, helpSections }) => {

  return (
    <>
      <Sidebar
        helpSections={helpSections}
        onSectionClick={onSectionClick}
        isMobile={true} /> </>
  );
};