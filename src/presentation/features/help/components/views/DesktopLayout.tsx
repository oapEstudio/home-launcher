import React from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import { Container, Paper, Typography } from '@mui/material';
import Divider from '../../../../components/ui/divider';
import { helpSections } from '../../mocks/mock-data';
import { Sidebar } from '../layout/Sidebar';
import { SectionContent } from '../content/SectionContent';
import { colors } from '../../../../common/colors';


interface DesktopLayoutProps {
  currentSection: string | null;
  onSectionClick: (sectionId: string) => void;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  currentSection,
  onSectionClick
}) => {
  const section = helpSections.find(s => s.id === currentSection);

  return (
    <CustomBox sx={{ display: 'flex' }}>

      <Container>

        <CustomBox sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Mesa de ayuda
          </Typography>
          <Divider sx={{ width: 100, borderBottomWidth: 1, mx: 'auto', mt: 2,  borderColor: colors.palette.primary.main }} />
        </CustomBox>
        <CustomBox sx={{ display: 'flex' }}>

          <Sidebar
            currentSection={currentSection}
            onSectionClick={onSectionClick}
            isMobile={false}
          />
          <CustomBox sx={{paddingLeft: 10 }}>
            <SectionContent section={section} />
          </CustomBox>
        </CustomBox>
      </Container>
    </CustomBox>
  );
};