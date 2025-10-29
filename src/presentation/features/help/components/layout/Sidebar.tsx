import { Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import { helpSections } from "../../mocks/mock-data";
import Divider from "../../../../components/ui/divider";
import H6 from "../../../../components/ui/H6/H6";
import { colors } from "../../../../common/colors";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  currentSection: string | null;
  onSectionClick: (sectionId: string) => void;
  isMobile: boolean;
  open?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionClick,
  isMobile,
  open = false,
  onClose
}) => {
  const drawerContent = (
    <CustomBox sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CustomBox sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
        <H6 style={{ fontWeight: 'bold', margin: 0 }}>ÍNDICE</H6>
        <Divider sx={{ borderBottomWidth: 1, mx: 'auto', mt: 1 }} />

        <List component="nav" disablePadding>
          {helpSections.map((section) => (
            <ListItemButton
              key={section.id}
              selected={currentSection === section.id}
              onClick={() => {
                onSectionClick(section.id);
                if (isMobile && onClose) {
                  onClose();
                }
              }}
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
                    fontSize: '0.9rem',
                    padding: 0,
                    margin: 0,
                    fontWeight: 600,
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </CustomBox>

    </CustomBox>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box'
          }
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%'
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
};