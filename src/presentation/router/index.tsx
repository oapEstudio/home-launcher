import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainHomeLauncher } from "../layout/home_launcher/MainHomeLauncher";
import { NavBarLauncher } from "../components/widgets/nav-bar-launcher/NavBarLauncher";
import { useGetMenuesHome } from "../features/home/hooks/useGetMenuesHome";
import type { NavItem } from "../components/widgets/menu-home/types";
import { mapMenuToNavItems } from "../features/home/mappers/menuHomeToNavItems";
import Footer from "../components/ui/footer/Footer";
import { RedStripe } from "../components/widgets/nav-bar-launcher/components/RedStripe";
import { useGetNotificationAlert } from "../features/home/hooks/useGetNotificationAlert";
import { useAuth } from "../contexts/AuthContext";

const Root: React.FC = () => {
    
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
     const alert: boolean = false;
 
    const mapResult: NavItem[] = mapMenuToNavItems(result?.data??[]);
    const userName = (getUserName() ?? '').trim();
    return (
        <MainHomeLauncher>
            { resultAlert &&  resultAlert.data.length > 0 && <RedStripe  message={resultAlert?.data[0].title} /> }
            <NavBarLauncher syncMenu={loading} userName={userName} menues={mapResult} logout={logout} />
            <ProtectedRoute />
            <Footer />
        </MainHomeLauncher>
    );
}

export default Root;