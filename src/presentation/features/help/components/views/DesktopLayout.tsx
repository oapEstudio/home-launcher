import React from 'react';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import { Container, Paper, Typography } from '@mui/material';
import { Sidebar } from '../layout/Sidebar';
import { SectionContent } from '../content/SectionContent';
import type { IHelp } from '../../../../../domain/entities/IHelp';


interface DesktopLayoutProps {
  currentSection: string;
  onSectionClick: (sectionId: string) => void;
  helpSections: IHelp[]
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  currentSection,
  onSectionClick,
  helpSections = [],
}) => {
  const section = helpSections.find(s => s.id === currentSection);

  return (
      <CustomBox sx={{ display: 'flex', width: '100%' }}>
        <Sidebar
          helpSections={helpSections}
          currentSection={currentSection}
          onSectionClick={onSectionClick}
          isMobile={false}
        />
        <CustomBox sx={{ paddingLeft: 5, width: '100%'}}>
          <SectionContent section={section} />
        </CustomBox>
    </CustomBox>
  );
};