import { Paper, Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import { ArticleAction } from "../common/ArticleAction";
import Divider from "../../../../components/ui/divider";

interface SectionContentProps {
  section: any | null | undefined; //TODO HelpSection
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
    // Aquí implementarías la lógica real de cada acción
  };

  return (
    <CustomBox>
      <CustomBox sx={{ mb: 4 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {section.title}
        </Typography>
        
        {section.description && (
          <Typography variant="body1" color="text.secondary">
            {section.description}
          </Typography>
        )}
      </CustomBox>

      {section.articles && section.articles.length > 0 ? (
        <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {section.articles.map((article: any) => (
            <Paper
              key={article.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="body1">
                {article.title}
              </Typography>
              <ArticleAction
                action={article.action}
                onAction={() => handleAction(article.id, article.action)}
              />
            </Paper>
          ))}
        </CustomBox>
      ) : (
        <CustomBox sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No hay artículos disponibles en esta sección
          </Typography>
        </CustomBox>
      )}
    </CustomBox>
  );
};