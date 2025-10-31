import { Paper, Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { HELP_ARTICLE, HELP_DOCUMENT } from "../../contants/helps";
import { ArticleItem } from "../common/ArticleItem";
import { DocumentItem } from "../common/DocumentItem";

interface SectionContentProps {
  section: IHelp | null | undefined;
}


export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  if (!section) {
    return (
      <CustomBox sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Selecciona una sección del menú
        </Typography>
      </CustomBox>
    );
  }

  return (
    <CustomBox>
      {section.children && section.children.length > 0 ? (
        <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2,  }}>
        {section.children.map((child: IHelp) => {
          if(child){
          if (child.helpTypeId === HELP_ARTICLE) {
            return (
              <ArticleItem key={child.id} item={child} />
            );
          }
          if (child.helpTypeId === HELP_DOCUMENT) {
            return <DocumentItem key={child.id} item={child} />;
          }
          return null
          }
        })}
        </CustomBox>
      ) : (
        <CustomBox sx={{ p: 14 }}>
          <Typography variant="body1" color="text.secondary">
            No hay artículos o documentos disponibles en esta sección.
          </Typography>
        </CustomBox>
      )}
    </CustomBox>
  );
};