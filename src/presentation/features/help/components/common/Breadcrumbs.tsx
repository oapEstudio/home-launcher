import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BreadcrumbsProps {
  section?: any;
  isMobile: boolean;
  onBackToMenu?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  section,
  isMobile,
  onBackToMenu
}) => {
  const breadcrumbItems = [
    <RouterLink key="inicio" to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      Inicio
    </RouterLink>
  ];

  if (isMobile && section) {
    breadcrumbItems.push(
      <RouterLink
        key="ayuda"
        to="/help"
        onClick={(e) => onBackToMenu?.()}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        Ayuda
      </RouterLink>,
      <Typography key="section" color="primary">
        {section.title}
      </Typography>
    );
  } else {
    breadcrumbItems.push(
      <Typography key="ayuda" color="primary">
        Ayuda
      </Typography>
    );
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
      {breadcrumbItems}
    </MuiBreadcrumbs>
  );
};
