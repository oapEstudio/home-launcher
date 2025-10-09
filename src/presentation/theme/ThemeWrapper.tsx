import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import launchertheme from './launchertheme';

const ThemeWrapper: React.FC<any> = ({children})=>{
    
     const theme = launchertheme;

    return (
        <ThemeProvider theme={theme}>
             <CssBaseline />
            {children}
        </ThemeProvider>
    );
};


export default ThemeWrapper;