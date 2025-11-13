
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
import imgCarouselDefault from './../../../../public/assets/img/home.png';
import Skeleton from '@mui/material/Skeleton';
import { CustomStack } from '../../components/ui/stack/Stack';

import { toSlide } from './mappers/notificationCarouselMapper';
import { useNavigate } from 'react-router-dom';
import type { ISlide } from '../../../domain/entities/ISlide';
import { mockSlides } from './mock/mock-carousel';

const slideDefault: ISlide = {
  id: '1',
  imageUrl: imgCarouselDefault,
  isActive: true,
  order: 1,  
  title: 'Bienvenido!!',
  subtitle: ''
}



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

  
    

  return (
    <>

        <Container description={'HOME'} title='HOME'>
           <CustomBox sx={{paddingLeft: '1rem', paddingRight: '2rem'}}>
              {!loadingCarousel? 
                    <Carousel slides={slides.length >0 ? slides : [slideDefault]} height={490} /> : 
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
             

              <CustomBox sx={{ borderTop:  `1px solid #AAAAAA`,
                borderBottom: `1px solid #AAAAAA`,alignContent: 'center', justifyItems: 'center', marginTop: '5rem', marginBottom: '3rem', height: '4rem', backgroundColor: '#FAFAFA', width: '104%', left: 0, position: 'relative', marginLeft: '-2%', marginRight: '0px'}}>
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
 

