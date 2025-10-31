import { List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import Divider from "../../../../components/ui/divider";
import React from "react";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import type { IHelp } from "../../../../../domain/entities/IHelp";


interface MobileMenuViewProps {
  onSectionClick: (sectionId: string) => void;
  helpSections: IHelp[],
  section?: IHelp
}



export const MobileMenuView: React.FC<MobileMenuViewProps> = ({ onSectionClick, helpSections }) => {

  return (
    <CustomBox sx={{ width: '100%' }}>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        ÍNDICE
      </Typography>
      <Divider sx={{ borderBottomWidth: 1, mx: 'auto', mt: 1 }} />

      <List disablePadding>
        {helpSections.map((section, index) => (
          <React.Fragment key={section.id}>
            <ListItemButton
              onClick={() => onSectionClick(section.id)}
              sx={{
                padding: 0.5,
                '&.Mui-selected': {
                  color: 'primary.main',
                  background: 'transparent',
                }
              }}
            >
              <ListItemText
                primary={section.title}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '1rem',
                    padding: 0,
                    margin: 0,
                    fontWeight: 600,
                  },
                }}
              />
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </CustomBox>
  );
};