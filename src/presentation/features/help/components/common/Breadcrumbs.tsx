import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';


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
  // Construir breadcrumbs como array
  const breadcrumbItems = [
    <Link
      key="inicio"
      underline="hover"
      color="inherit"
      href="#"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
    >
      Inicio
    </Link>
  ];

  if (isMobile && section) {
    breadcrumbItems.push(
      <Link
        key="ayuda"
        underline="hover"
        color="inherit"
        href="#"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          onBackToMenu?.();
        }}
      >
        Ayuda
      </Link>,
      <Typography key="section" color="primary">
        {section.title}
      </Typography>
    );
  } else {
    breadcrumbItems.push(
      <Typography key="ayuda" color="text.primary">
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