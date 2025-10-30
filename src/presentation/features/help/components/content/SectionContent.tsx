import { Paper, Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import { ArticleAction } from "../common/ArticleAction";
import type { IHelp } from "../../../../../domain/entities/IHelp";

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

  const handleAction = (articleId: number, action: string): void => {
    console.log(`Acción: ${action} en artículo ${articleId}`);
    //TODO Aquí IMPLEMENTAR la lógica real de cada acción
  };

  return (
    <CustomBox>
      {section.children && section.children.length > 0 ? (
        <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {section.children.map((children: any) => (
            <Paper
              key={children.id}
              elevation={0}
              sx={{
                py: 2,
                borderRadius: 0,
                alignItems: 'center',
              }}
            >
              <CustomBox sx={{ mb: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {children.title}
                </Typography>
              </CustomBox>
              <CustomBox>
                <Typography>
                  {children.description}
                </Typography>
              </CustomBox>
              <ArticleAction
                action={children.action}
                onAction={() => handleAction(children.id, children.action)}
              />
            </Paper>
          ))}
        </CustomBox>
      ) : (
        <CustomBox sx={{ p: 14, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No hay artículos o documentos disponibles en esta sección.
          </Typography>
        </CustomBox>
      )}
    </CustomBox>
  );
};