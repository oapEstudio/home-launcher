import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "@mui/material/Button";
import { SectionContent } from "../content/SectionContent";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { Typography } from "@mui/material";

interface MobileSectionViewProps {
  section: IHelp | null | undefined;
  onBackToMenu: () => void;
}

export const MobileSectionView: React.FC<MobileSectionViewProps> = ({
  section,
  onBackToMenu
}) => {
  return (
    <CustomBox sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CustomBox sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <SectionContent section={section} />
        {(!section || !section.children || section.children.length === 0) && (
          <CustomBox sx={{ minHeight: 300, display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No hay artículos o documentos disponibles en esta sección.
            </Typography>
          </CustomBox>
        )}
      </CustomBox>
      <Button
        onClick={onBackToMenu}
        sx={{ mt: 4, fontWeight: 600 }}
      >
        VOLVER AL MENÚ ANTERIOR
      </Button>
    </CustomBox>
  );
};