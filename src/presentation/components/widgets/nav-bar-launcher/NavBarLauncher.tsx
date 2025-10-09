import React from 'react';
import { RedStripe } from './components/RedStripe';
import { CustomBox } from '../../ui/box/CustomBox';
import { CustomStack } from '../../ui/stack/Stack';
import { HelpIcon } from '../../ui/icons';
import LogoYPF from '../../ui/icons/ypf-logo/ypf-logo';
import Typography from '@mui/material/Typography';
import { Button } from '../../ui/button';
import { NotificationBell } from './components/NotificationBell';
import './NavBarLauncher.css';
import { LauncherMenu } from '../menu-home/LauncherMenu';;
import { LauncherHamburgerButton } from '../menu-home/LauncherMenuHamburguesaButton';;
import type { NavItem } from '../menu-home/types';;
import { DividerCell } from './components/DividerCell';;

interface INavBarLauncherProps{
  userName: string;
  menues: NavItem[];
  syncMenu: boolean;
}



export const NavBarLauncher: React.FC<INavBarLauncherProps> = ({ userName, menues, syncMenu }) => {
  
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>      
      <CustomBox
        component="header"
        sx={{
          px: { xs: '4%', md: '8.5%' },
          bgcolor: 'background.paper',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.06)',
          position: 'relative',
          zIndex: 10,
          overflow: 'visible',
        }}
      >
  
        <CustomStack
          direction="row"
          sx={{
            width: '100%',
            alignItems: 'stretch',         
            justifyContent: 'space-between',
            gap: { xs: 1, md: 2 },
            overflow: 'visible',
          }}
        >
         
          <CustomStack
            direction="row"
            sx={{ alignItems: 'center', gap: 1.5, overflow: 'visible' }}
          >
            <DividerCell>
              <LauncherHamburgerButton
                sync={syncMenu}
                ref={btnRef}
                pressed={open}
                onToggle={() => setOpen(v => !v)}
              />
              <LauncherMenu
                data={menues}
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={btnRef.current}
                className="launcherMenuDropdown"    
              />
            </DividerCell>

            <CustomBox sx={{ mt: { xs: 0.5, md: 0.5 } }}>
              <LogoYPF link="/" />
            </CustomBox>
          </CustomStack>

         
          <CustomStack
            direction="row"
            sx={{ alignItems: 'center', gap: 2, overflow: 'visible' }}
          >
            <CustomStack
              sx={{
                alignItems: { xs: 'flex-end', md: 'flex-end' },
                lineHeight: 1,
                display: { xs: 'none', sm: 'flex' },    
                pt: '0.75rem',
              }}
            >
              <Typography variant="body1" sx={{ color: 'primary.main' }}>
                Hola, <span style={{ textTransform: 'uppercase' }}>{userName}</span>
              </Typography>
              <div className="containerCloseSesion">
                <Button variant="secondary" title="Cerrar sesión" />
              </div>
            </CustomStack>

            <DividerCell>
              <NotificationBell />
            </DividerCell>

            <div className='buttonHelp'>
               <Button             
                  variant="secondaryTwo"
                  title="Contáctanos"
                  style={{ backgroundColor: '#FAFAFA', borderRadius: 0 }}
                  icon={<HelpIcon />}
                />
            </div>
          </CustomStack>
        </CustomStack>
      </CustomBox>
    </>
  );
};
