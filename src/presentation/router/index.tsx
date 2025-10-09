import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainHomeLauncher } from "../layout/home_launcher/MainHomeLauncher";
import { NavBarLauncher } from "../components/widgets/nav-bar-launcher/NavBarLauncher";
import { useGetMenuesHome } from "../features/home/hooks/useGetMenuesHome";
import type { NavItem } from "../components/widgets/menu-home/types";
import { mapMenuToNavItems } from "../features/home/mappers/menuHomeToNavItems";
import Footer from "../components/ui/footer/Footer";
import { RedStripe } from "../components/widgets/nav-bar-launcher/components/RedStripe";

const Root: React.FC = () => {
    
    const {result, loading} = useGetMenuesHome({
        page: 1,
        pageSize: 1000,
        sortBy: '',
        sortDescending: false
    });
     const alert: boolean = false;
 
    const mapResult: NavItem[] = mapMenuToNavItems(result?.data??[]);
    return (
        <MainHomeLauncher>
            { alert && <RedStripe  message="El sistema de Gestión de Pedidos estará en mantenimiento el día de hoy de 13hs a 16hs" /> }
            <NavBarLauncher syncMenu={loading} userName={"Brian Ojeda"} menues={mapResult} />
            <ProtectedRoute />
            <Footer />
        </MainHomeLauncher>
    );
}

export default Root;