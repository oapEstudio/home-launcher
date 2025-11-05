import { Paper, Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { HELP_ARTICLE, HELP_DOCUMENT } from "../../contants/helps";
import { ArticleItem } from "../common/ArticleItem";
import { DocumentItem } from "../common/DocumentItem";
import { useMemo } from "react";
import Divider from "../../../../components/ui/divider";
import { min } from "lodash";

interface SectionContentProps {
  section: IHelp | null | undefined;
}


export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  const articlesInSection = useMemo(() => {
    if (!section?.children) return [];
    return section.children.filter(
      (child: IHelp) => child && child.helpTypeId === HELP_ARTICLE
    );
  }, [section?.children]);

  const showAccordion = articlesInSection.length > 1;

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
    <>
      <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CustomBox sx={{ mb: 3, mt: 2 }}>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: 'primary.main',
              mb: 1.5
            }}
          >
            {section.title}
          </Typography>
          <Divider sx={{ width: 60, borderBottomWidth: 2, borderColor: 'primary.main' }} />
        </CustomBox>
        {section.children.map((child: IHelp) => {
          if (!child) return null;

          if (child.helpTypeId === HELP_ARTICLE) {
            return (
              <ArticleItem
                key={child.id}
                item={child}
                showAccordion={showAccordion}
              />
            );
          }

          if (child.helpTypeId === HELP_DOCUMENT) {
            return <DocumentItem key={child.id} item={child} />;
          }

          return null;
        })}
      </CustomBox>

    </>
  );
};