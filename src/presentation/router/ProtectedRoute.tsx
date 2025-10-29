import { Routes, Route } from 'react-router-dom';

import { HELP, HOME } from './routes';
import { HomePage } from '../features/home/HomePage';
import { HelpPage } from '../features/help/HelpPage';

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
  </Routes>
);