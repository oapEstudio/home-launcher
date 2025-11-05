import { Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { DocumentItem } from "./DocumentItem";
import { CustomAccordion } from "../../../../components/ui/accordion/Accordion";

interface ArticleItemProps {
  item: IHelp;
  showAccordion?: boolean; 
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ 
  item, 
  showAccordion = false 
}) => {
  // Contenido común
  const content = (
    <CustomBox>
      {item.description && (
        <CustomBox 
          sx={{ 
            mb: 3,
            p: 2,
            backgroundColor: 'grey.50',
            borderRadius: 1,
            borderLeft: 1,
            borderColor: 'primary.main'
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.7
            }}
          >
            {item.description}
          </Typography>
        </CustomBox>
      )}

      {/* Documentos hijos */}
      {item.children && item.children.length > 0 && (
        <CustomBox sx={{ mt: 2 }}>
          {item.children.map((document, index) => (
            <CustomBox 
              key={document.id}
              sx={{ 
                mb: index < item.children.length - 1 ? 2 : 0 
              }}
            >
              <DocumentItem item={document} />
            </CustomBox>
          ))}
        </CustomBox>
      )}
    </CustomBox>
  );

  if (!showAccordion) {
    return (
      <CustomBox>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.1rem',
            mb: 2,
          }}
        >
          {item.title}
        </Typography>
        {content}
      </CustomBox>
    );
  }

  return (
    <CustomAccordion
      title={item.title}
      titleSx={{
        fontSize: '1.1rem',
      }}
      accordionSx={{
        border: 'none',
        borderRadius: 0,
        borderBottom: '1px solid #E0E0E0'
      }}
      content={content}
    />
  );
};