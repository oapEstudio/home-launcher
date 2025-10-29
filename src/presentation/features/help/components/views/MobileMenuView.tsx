import { List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { Breadcrumbs } from "../common/Breadcrumbs";
import Divider from "../../../../components/ui/divider";
import { helpSections } from "../../mocks/mock-data";
import React from "react";
import { CustomBox } from "../../../../components/ui/box/CustomBox";


interface MobileMenuViewProps {
  onSectionClick: (sectionId: string) => void;
}

export const MobileMenuView: React.FC<MobileMenuViewProps> = ({ onSectionClick }) => {
  return (
    <CustomBox sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      
      <Paper elevation={0} sx={{ p: 3 }}>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Mesa de ayuda
        </Typography>
        <Divider sx={{ width: 64, borderBottomWidth: 3, mb: 4 }} />
        
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          ÍNDICE
        </Typography>
        
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
          <List disablePadding>
            {helpSections.map((section, index) => (
              <React.Fragment key={section.id}>
                <ListItemButton
                  onClick={() => onSectionClick(section.id)}
                  sx={{ py: 2 }}
                >
                  <ListItemText primary={section.title} />
                </ListItemButton>
                {index !== helpSections.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Paper>
    </CustomBox>
  );
};