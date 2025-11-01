
import Container from '../../components/ui/container';
import { Carousel } from '../../components/widgets/carousel/Carousel';
import { CustomBox } from '../../components/ui/box/CustomBox';
import RelevantApplications, { type QuickLink } from '../../components/widgets/relevant-applications/RelevantApplications';
import { Button } from '../../components/ui/button';
import { HelpIcon } from '../../components/ui/icons';
import { colors } from '../../common/colors';
import { toQuickLink } from './mappers/highlightMapper';
import { useHomePage } from './hooks/useHomePage';
import {  useMemo } from 'react';

import Skeleton from '@mui/material/Skeleton';
import { CustomStack } from '../../components/ui/stack/Stack';

import { toSlide } from './mappers/notificationCarouselMapper';
import { useNavigate } from 'react-router-dom';
import type { ISlide } from '../../../domain/entities/ISlide';


export const HomePage = () => {

  const navigate = useNavigate();

  const {
      resultHighlighted,
      loadingHighlighted,
      resultCarousel,
       loadingCarousel
      } = useHomePage();

  const slides = useMemo(
                () => (resultCarousel?.data ?? []).map(m => toSlide(m)),
                [resultCarousel?.data]
              )

   const mockSlides: ISlide[] = [
  {
    id: "s1",
    title: "Innovamos para acompañarte todos los días",
    subtitle: "Conocé las nuevas herramientas que te ayudan a gestionar tu negocio de manera más simple.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600",
    cta: { label: "Ver más", href: "https://www.ypf.com", target: "_blank" },
    order: 1,
    isActive: true,
    activeFrom: "2025-10-01T00:00:00Z",
    activeTo: "2025-12-31T23:59:59Z"
  },
  {
    id: "s2",
    title: "Digitalizá tu experiencia con nuestras soluciones",
    subtitle: "Accedé a tus datos, pedidos y reportes desde cualquier dispositivo.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600",
    cta: { label: "Probar ahora", href: "https://portal.miempresa.com", target: "_blank" },
    order: 2,
    isActive: true
  },
  {
    id: "s3",
    title: "Gestión inteligente de tus operaciones",
    subtitle: "Automatizá procesos y ganá tiempo para enfocarte en lo importante.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&fit=crop&q=80",
    cta: { label: "Descubrí cómo", href: "https://gestion.miempresa.com" },
    order: 3,
    isActive: true
  },
  {
    id: "s4",
    title: "Sostenibilidad y eficiencia en cada paso",
    subtitle: "Comprometidos con el futuro: innovación y responsabilidad ambiental.",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600",
    cta: { label: "Más información", href: "https://sustentabilidad.miempresa.com", target: "_blank" },
    order: 4,
    isActive: true
  }
];
  return (
    <>

        <Container description={'HOME'} title='HOME'>
           <CustomBox sx={{paddingLeft: '1rem', paddingRight: '2rem'}}>
              {!loadingCarousel? 
                    <Carousel slides={mockSlides} height={490}/> : 
                    <CustomStack sx={{padding: '1%'}} direction='row' spacing={1}>
                      <Skeleton variant="rectangular" height={450} sx={{width: {xs: '100%',md: '50%'}}}  />
                      <Skeleton variant="rectangular" width='50%' height={450} sx={{display: {xs: 'none',md: 'block'}}}/>
                    </CustomStack>
              }
              {
                loadingHighlighted?  <CustomStack sx={{padding: '1%'}} direction='row' spacing={1}>
                                          <Skeleton variant="rectangular" sx={{width: {xs: '100%',md: '25%'}}} height={200} />
                                          <Skeleton variant="rectangular" width='25%' height={200} sx={{display: {xs: 'none',md: 'block'}}}/>
                                          <Skeleton variant="rectangular" width='25%' height={200} sx={{display: {xs: 'none',md: 'block'}}}/>
                                          <Skeleton variant="rectangular" width='25%' height={200} sx={{display: {xs: 'none',md: 'block'}}}/>
                                      </CustomStack>:
                                      <RelevantApplications  items={(resultHighlighted?.data.map(toQuickLink) as QuickLink[])} />
              } 
             

              <CustomBox sx={{ borderTop:  `1px solid ${colors.palette.primary.main}`,
                borderBottom: `1px solid ${colors.palette.primary.main}`,alignContent: 'center', justifyItems: 'center', marginTop: '5rem', marginBottom: '3rem', height: '4rem', backgroundColor: '#FAFAFA', width: '104%', left: 0, position: 'relative', marginLeft: '-2%', marginRight: '0px'}}>
                 <Button             
                  variant="secondaryTwo"
                  title="Ayuda"
                  onClick={() => navigate('/help')}
                  style={{ backgroundColor: '#FAFAFA', borderRadius: 0 }}
                  icon={<HelpIcon />}
                />
              </CustomBox>
           </CustomBox>
        </Container>
               
    </>
    
  );
};
 

