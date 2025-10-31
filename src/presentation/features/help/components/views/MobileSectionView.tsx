import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "@mui/material/Button";
import { SectionContent } from "../content/SectionContent";
import type { IHelp } from "../../../../../domain/entities/IHelp";

interface MobileSectionViewProps {
  section: IHelp | null | undefined;
  onBackToMenu: () => void;
}

export const MobileSectionView: React.FC<MobileSectionViewProps> = ({
  section,
  onBackToMenu
}) => {
  return (
    <CustomBox sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CustomBox sx={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <SectionContent section={section} />
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