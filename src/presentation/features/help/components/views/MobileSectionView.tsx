import { Paper } from "@mui/material";
import { Breadcrumbs } from "../common/Breadcrumbs";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "@mui/material/Button";
import { SectionContent } from "../content/SectionContent";

interface MobileSectionViewProps {
  section: any | null | undefined; // TODO TIPAR HelpSection
  onBackToMenu: () => void;
}

export const MobileSectionView: React.FC<MobileSectionViewProps> = ({ 
  section, 
  onBackToMenu 
}) => {
  return (
    <CustomBox sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      
      <Paper elevation={0} sx={{ p: 3, minHeight: '100vh' }}>
        <SectionContent section={section} />
        
        <Button
          onClick={onBackToMenu}
          sx={{ mt: 4, fontWeight: 600 }}
        >
          VOLVER AL MENÚ ANTERIOR
        </Button>
      </Paper>
    </CustomBox>
  );
};