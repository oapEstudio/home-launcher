import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainHomeLauncher } from "../layout/home_launcher/MainHomeLauncher";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HELP, HOME } from "./routes";
import { HomePage } from "../features/home/HomePage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HelpPage } from "../features/help/HelpPage";
import { Page404Launcher } from "../layout/home_launcher/Page404Launcher";
import { PageError } from "../components/widgets/page-error/PageError";
import { DynamicPageTemplate } from "../features/dynamic-page-wrapper/pages/dynamic-page-template/DynamicPageTemplate";

const loginUrl = new URL('/.auth/login', window.location.origin);

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,          
    children: [
      {
        element: <MainHomeLauncher />,     
        children: [
          { path: HOME.name, element: <HomePage />},
          { path: HELP.name, element: <HelpPage />},
          { path: 'pages-with-menu/:title', element: <DynamicPageTemplate /> },
          { path: '*', element: <Page404Launcher /> },     
        ]
      },
      { path: 'pages/:title', element: <DynamicPageTemplate /> },                        
    ]
  },
 { path: '*', element: <PageError 
                                cod='401' 
                                error='Acceso denegado' 
                                details='La solicitud requiere autenticación válida para continuar.' 
                                redirectPath={loginUrl.toString()} /> }
])


export default function AppRouter() {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
        </LocalizationProvider>
}