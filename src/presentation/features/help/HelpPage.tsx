import { CustomBox } from "../../components/ui/box/CustomBox";
import React, { useState, useEffect } from "react";
import { useResponsive } from "./hooks/useResponsive";
import { MobileSectionView } from "./components/views/MobileSectionView";
import { MobileMenuView } from "./components/views/MobileMenuView";
import { DesktopLayout } from "./components/views/DesktopLayout";
import { Breadcrumbs } from "./components/common/Breadcrumbs";
import { Divider, Skeleton, Typography } from "@mui/material";
import { colors } from "../../common/colors";
import { useGetHelp } from "./hooks/useGetHelp";
import Loading from "../../components/ui/loading";
import { CustomStack } from "../../components/ui/stack/Stack";

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
  const { result, loading, error } = useGetHelp(INTIAL_PARAMS);

  useEffect(() => {
    setCurrentView("menu");
    setSelectedSection("");   // <-- evita breadcrumb “sucio” al pasar de mobile<->desktop
  }, [isMobile]);

  // 2) En desktop, cuando hay datos y no hay selección, elegir el primero
  useEffect(() => {
    if (!isMobile && result?.data?.length && !selectedSection) {
      setSelectedSection(result.data[0].id);
    }
  }, [isMobile, result, selectedSection]);

  const section = selectedSection
    ? result?.data.find((s) => s.id === selectedSection)
    : null;

  return (
    <CustomBox maxWidth="1400px" sx={{ margin: "auto" }}>
      <CustomBox sx={{ p: 3 }}>
        <Breadcrumbs
          section={section}
          isMobile={isMobile}
          onBackToMenu={handleBackToMenu}
        />
        <CustomBox sx={{ textAlign: "center", py: 4, mb: 3, mt: 4}}>

        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Mesa de ayuda
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Encuentra documentación y recursos de ayuda
        </Typography>
        </CustomBox>

        {loading ? (
          <CustomStack sx={{ padding: '1%' }} direction='row' spacing={1}>
            <Skeleton variant="rectangular" height={450} sx={{ width: { xs: '100%', md: '25%' } }} />
            <Skeleton variant="rectangular" height={450} sx={{ width: { md: '75%' } }} />
          </CustomStack>

        ) : (
          <CustomBox sx={{ flexGrow: 1, overflow: "hidden", width: '100%', display: 'flex' }}>
            {isMobile ? (
              <>
                {currentView === "menu" ? (
                    <MobileMenuView
                      onSectionClick={handleSectionClick}
                      helpSections={result?.data || []}
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
                helpSections={result?.data || []}
                currentSection={selectedSection}
                onSectionClick={handleSectionClick}
              />
            )}
          </CustomBox>
        )}
      </CustomBox>
    </CustomBox>
  );
};
