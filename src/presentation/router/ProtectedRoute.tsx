import { Routes, Route } from 'react-router-dom';

import { HELP, HOME } from './routes';
import { HomePage } from '../features/home/HomePage';
import { HelpPage } from '../features/help/HelpPage';
import { Page404Launcher } from '../layout/home_launcher/Page404Launcher';

export const ProtectedRoute = () => (
  <Routes>   
    <Route
      path={HOME.name}
      element={        
          <HomePage />       
      }
    />

    <Route
      path={HELP.name}
      element={        
          <HelpPage />       
      }
    />
    
    <Route
      path='*'
      element={        
          <Page404Launcher />       
      }
    />
  </Routes>
);