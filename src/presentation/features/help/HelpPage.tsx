import { CustomBox } from "../../components/ui/box/CustomBox";
import Container from "../../components/ui/container";
import React, { useState, useEffect } from 'react';
import { useResponsive } from "./hooks/useResponsive";
import { MobileSectionView } from "./components/views/MobileSectionView";
import { MobileMenuView } from "./components/views/MobileMenuView";
import { DesktopLayout } from "./components/views/DesktopLayout";
import { Breadcrumbs } from "./components/common/Breadcrumbs";


const helpSections = [
  {
    id: 'gestion-casos',
    title: 'Gestión de casos',
    description: 'Et nec nunc ornare nisi ac adipiscing sit magnis in. Pretium euismod quis eget quisque a aliquet justo proin. Adipiscing fusce massa volutpat leo leo turpis eu eget vel.',
    articles: [
      { id: 1, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'download' },
      { id: 2, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'explore' },
      { id: 3, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'download' },
      { id: 4, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'explore' },
      { id: 5, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'view' }
    ]
  },
  {
    id: 'tema-2',
    title: 'Tema 2',
    description: 'Et nec nunc ornare nisi ac adipiscing sit magnis in. Pretium euismod quis eget quisque a aliquet justo proin. Adipiscing fusce massa volutpat leo leo turpis eu eget vel.',
    articles: [
      { id: 6, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'view' },
      { id: 7, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'explore' },
      { id: 8, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'download' },
      { id: 9, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'explore' },
      { id: 10, title: 'Lorem ipsum dolor sit amet consectetur.', action: 'view' }
    ]
  },
  { id: 'aprendizaje-comercial', title: 'Aprendizaje Comercial', articles: [] },
  { id: 'resumen-movimientos', title: 'Resumen de movimientos', articles: [] },
  { id: 'sellos-red-xxi', title: 'Sellos RED XXI', articles: [] },
  { id: 'azul32', title: 'Azul32', articles: [] },
  { id: 'mass', title: 'MASS', articles: [] },
  { id: 'tiendas', title: 'Tiendas', articles: [] },
  { id: 'ypf-ruta', title: 'YPF Ruta de estaciones', articles: [] },
  { id: 'lota-liquido', title: 'Lota Líquido de Producto', articles: [] },
  { id: 'proyecto-justo', title: 'Proyecto Justo Para Vos', articles: [] },
  { id: 'moes', title: 'MOES', articles: [] }
];

export const HelpPage = () => {
  const { isMobile } = useResponsive();
  const [currentView, setCurrentView] = useState('menu');
  const [selectedSection, setSelectedSection] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    if (isMobile) {
      setCurrentView('section');
    }
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    setSelectedSection('');
  };


  const section = selectedSection
    ? helpSections.find(s => s.id === selectedSection)
    : null;

  return (
    <>
      <Container description={'MESA DE AYUDA'} title='AYUDA'>
        <CustomBox sx={{ maxWidth: '1400px', margin: 'auto' }}>
          <CustomBox sx={{ py: 3 }}>
            <Breadcrumbs section={section} isMobile={isMobile} onBackToMenu={handleBackToMenu} />
            <CustomBox sx={{ flexGrow: 1, overflow: 'hidden' }}>
              {isMobile ? (
                <>
                  {currentView === 'menu' ? (
                    <CustomBox sx={{ height: '100%', overflow: 'auto' }}>
                      <MobileMenuView onSectionClick={handleSectionClick} />
                    </CustomBox>
                  ) : (
                    <CustomBox sx={{ height: '100%', overflow: 'auto' }}>
                      <MobileSectionView
                        section={section}
                        onBackToMenu={handleBackToMenu}
                      />
                    </CustomBox>
                  )}
                </>
              ) : (
                <DesktopLayout
                  currentSection={selectedSection}
                  onSectionClick={handleSectionClick}
                />
              )}
            </CustomBox>
          </CustomBox>
        </CustomBox>
      </Container >

    </>

  );
};


