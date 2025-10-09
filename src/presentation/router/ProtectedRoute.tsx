import { Routes, Route } from 'react-router-dom';

import { HOME } from './routes';
import { HomePage } from '../features/home/HomePage';

export const ProtectedRoute = () => (
  <Routes>   
    <Route
      path={HOME.name}
      element={        
          <HomePage />       
      }
    />
  </Routes>
);