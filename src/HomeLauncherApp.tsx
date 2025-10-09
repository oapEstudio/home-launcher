
import ThemeWrapper from './presentation/theme/ThemeWrapper';
import { BrowserRouter } from 'react-router-dom';
import Application from './presentation/router';
import '@fontsource/open-sans/300.css';  // peso 300
import '@fontsource/open-sans/400.css';  // peso 400 (normal)
import '@fontsource/open-sans/600.css';  // peso 600
import '@fontsource/open-sans/700.css';  // peso 700

import { DependencyContext, defaultDependencies } from './presentation/contexts/DependencyContext';

export const HomeLauncherApp = () => {

  return (
    <>
    <DependencyContext.Provider value={defaultDependencies}>
         <BrowserRouter>
            <ThemeWrapper>
              <Application />
            </ThemeWrapper>
         </BrowserRouter>
    </DependencyContext.Provider>
    
      
    </>
  )
}
