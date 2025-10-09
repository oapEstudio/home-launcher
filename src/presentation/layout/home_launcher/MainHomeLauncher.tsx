

import React from 'react'
import { CustomBox } from '../../components/ui/box/CustomBox'


interface IMainHomeLauncherProps{
  children: React.ReactNode;
}

export const MainHomeLauncher: React.FC<IMainHomeLauncherProps> = ({children}) => {
  return (
    <CustomBox sx={{ minHeight: "100dvh", bgcolor: 'background.paper' }}>    
      {children}
    </CustomBox>
  )
}
