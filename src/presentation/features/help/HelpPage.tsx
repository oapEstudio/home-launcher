import { CustomBox } from "../../components/ui/box/CustomBox";
import React, { useState, useEffect } from "react";
import { useResponsive } from "./hooks/useResponsive";
import { MobileSectionView } from "./components/views/MobileSectionView";
import { MobileMenuView } from "./components/views/MobileMenuView";
import { DesktopLayout } from "./components/views/DesktopLayout";
import { Breadcrumbs } from "./components/common/Breadcrumbs";
import { Skeleton, Typography, Button } from "@mui/material";
import { useGetHelp } from "./hooks/useGetHelp";
import { CustomStack } from "../../components/ui/stack/Stack";
import { useNavigate } from "react-router-dom";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

export const HelpPage = () => {
  const { isMobile } = useResponsive();
  const [currentView, setCurrentView] = useState("menu");
  const [selectedSection, setSelectedSection] = useState<string>("");

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(sectionId);
    if (isMobile) {
      setCurrentView("section");
    }
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
    setSelectedSection("");
  };

  const INTIAL_PARAMS = { page: 1, pageSize: 1000, sortBy: "", sortDescending: true };
  const { result, loading } = useGetHelp(INTIAL_PARAMS);

  useEffect(() => {
    setCurrentView("menu");
    setSelectedSection("");
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile && result?.data?.length && !selectedSection) {
      setSelectedSection(result.data[0].id);
    }
  }, [isMobile, result, selectedSection]);

  const section = selectedSection
    ? result?.data.find((s) => s.id === selectedSection)
    : null;

  const sections = result?.data ?? [];
  const hasNoSections = !Array.isArray(sections) || sections.length === 0;

  const navigate = useNavigate();


  return (
    <CustomBox maxWidth="1400px" sx={{ margin: "auto" }}>
      <CustomBox sx={{ p: 3 }}>
        <Breadcrumbs
          section={section}
          isMobile={isMobile}
          onBackToMenu={handleBackToMenu}
        />
        <CustomBox sx={{ textAlign: "center", py: 4, mb: 3, mt: 4 }}>

          <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
            Mesa de ayuda
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Encontrá acá todos los recursos de ayuda disponibles
          </Typography>
        </CustomBox>

        {loading ? (
          <CustomStack sx={{ padding: '1%' }} direction='row' spacing={1}>
            <Skeleton variant="rectangular" height={450} sx={{ width: { xs: '100%', md: '25%' } }} />
            <Skeleton variant="rectangular" height={450} sx={{ width: { md: '75%' } }} />
          </CustomStack>

        ) : (
          <CustomBox sx={{ flexGrow: 1, overflow: "hidden", width: '100%', display: 'flex' }}>
            {hasNoSections ? (
              <CustomBox
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: '50vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4
                }}
              >
                <CustomBox
                >
                  <ArticleOutlinedIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                </CustomBox>
                
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                  No hay secciones disponibles
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
                  En este momento no tenemos contenido de ayuda disponible. Por favor, reintente más tarde.
                </Typography>
                
                <Button
                  onClick={() => navigate('/')}
                  sx={{ 
                    textTransform: 'none',
                    px: 3,
                    mb: 8
                  }}
                >
                  Regresar al Inicio
                </Button>
              </CustomBox>
            ) : (
              isMobile ? (
                <>
                  {currentView === "menu" ? (
                    <MobileMenuView
                      onSectionClick={handleSectionClick}
                      helpSections={sections}
                    />
                  ) : (
                    <CustomBox sx={{ height: "100%", overflow: "auto", width: '95%', margin: 'auto' }}>
                      <MobileSectionView
                        section={section}
                        onBackToMenu={handleBackToMenu}
                      />
                    </CustomBox>
                  )}
                </>
              ) : (
                <DesktopLayout
                  helpSections={sections}
                  currentSection={selectedSection}
                  onSectionClick={handleSectionClick}
                />
              )
            )}
          </CustomBox>
        )}
      </CustomBox>
    </CustomBox>
  );
};