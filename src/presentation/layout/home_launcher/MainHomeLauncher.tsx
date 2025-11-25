

import React from 'react'
import { CustomBox } from '../../components/ui/box/CustomBox'
import { Outlet } from 'react-router-dom';
import { RedStripe } from '../../components/widgets/nav-bar-launcher/components/RedStripe';
import { NavBarLauncher } from '../../components/widgets/nav-bar-launcher/NavBarLauncher';
import Footer from '../../components/ui/footer/Footer';
import { useGetNotificationAlert } from '../../features/home/hooks/useGetNotificationAlert';
import { mapMenuToNavItems } from '../../features/home/mappers/menuHomeToNavItems';
import type { NavItem } from '../../components/widgets/menu-home/types';
import { useAuth } from '../../contexts/AuthContext';
import { useGetMenuesHome } from '../../features/home/hooks/useGetMenuesHome';


export const MainHomeLauncher: React.FC = () => {

  const { getUserName, logout } = useAuth();
  const {result, loading} = useGetMenuesHome({
        page: 1,
        pageSize: 1000,
        sortBy: '',
        sortDescending: false
    });

  const {result: resultAlert} = useGetNotificationAlert({
        page: 1,
        pageSize: 1,
        sortBy: '',
        sortDescending: false
    })
  const mapResult: NavItem[] = mapMenuToNavItems(result?.data??[]);

  const alert: boolean = false;  
  const userName = (getUserName() ?? '').trim();

  return (
    <CustomBox sx={{ minHeight: "100dvh", bgcolor: 'background.paper' }}>   
        { resultAlert &&  
          resultAlert.data.length > 0 && 
          <RedStripe  message={resultAlert?.data[0].title} /> 
        }
        <NavBarLauncher 
              syncMenu={loading} 
              userName={userName} 
              menues={mapResult} 
              logout={logout} /> 
            
            <Outlet />

        <Footer />
    </CustomBox>
  )
}
