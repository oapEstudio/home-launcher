import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import CustomBadge from '../../../ui/badge/CustomBadge';
import { BellIcon, SyncIconn } from '../../../ui/icons';
import { colors } from '../../../../common/colors';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CustomStack } from '../../../ui/stack/Stack';

import { NotificationBellRow, type NotificationItem } from './NotificationBellRows';
import { useUpdateNotification } from '../../../../features/home/hooks/useUpdateNotification';


export type NotificationGroups = {
  today: NotificationItem[];
  yesterday: NotificationItem[];
  others: NotificationItem[];
};

type NotificationBellProps = {
  groups: NotificationGroups;
  loading: boolean;
  iconResolver?: (typeId: NotificationItem['notificationTypeId']) => React.ReactNode;
  badgeCount?: number;
  panelWidth?: { xs?: string | number; md?: string | number };
  labels?: { today?: string; yesterday?: string; others?: string };
};

dayjs.locale('es');

export const NotificationBell: React.FC<NotificationBellProps> = ({
  groups,
  loading,
  iconResolver,
  badgeCount,
  panelWidth = { xs: '20rem', md: '25rem' },
  labels = { today: 'Hoy', yesterday: 'Ayer', others: 'Más antiguos' },
}) => {
  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [totalNotification,setTotalNotification] = useState(0);
  const {update} = useUpdateNotification();

  const handleToggle = async () => {

      setOpen((prev) => {   
          setTotalNotification(0);
          return !prev;
      });

      if(totalNotification > 0){
        await update()       
      } 
  }
  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return;
    setOpen(false);
  };

  useEffect(()=>{

    setTotalNotification(badgeCount ?? groups?
          (groups.today?.filter(f=>!f.read).length ?? 0) + 
          (groups.yesterday?.filter(f=>!f.read).length ?? 0) + 
          (groups.others?.filter(f=>!f.read).length ?? 0) : 0);

  },[groups]);

  const todayRight = dayjs().format('DD MMM');
  const yesterdayRight = dayjs().subtract(1, 'day').format('DD MMM');



  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="notification-bell" >
        {
          loading? <SyncIconn /> :
                  <IconButton onClick={handleToggle} style={{ color: colors.palette.primary.main }}>
                    <CustomBadge count={totalNotification} color="error">
                      <BellIcon />
                    </CustomBadge>
                  </IconButton>
        }        
      </ButtonGroup>

      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        onMouseLeave={(e) => handleClose(e.nativeEvent)}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <CustomStack direction="column" sx={{ width: panelWidth }}>
                <NotificationBellRow 
                    iconResolver={iconResolver} 
                    titleLeft={labels.today ?? 'Hoy'} 
                    titleRight={todayRight} 
                    items={groups?.today ?? []} />
                <NotificationBellRow
                  iconResolver={iconResolver}
                  titleLeft={labels.yesterday ?? 'Ayer'}
                  titleRight={yesterdayRight}
                  items={groups?.yesterday ?? []}
                />
                <NotificationBellRow 
                    iconResolver={iconResolver} 
                    titleLeft={labels.others ?? 'Más antiguos'} 
                    titleRight="-" 
                    items={groups?.others ?? []} />
              </CustomStack>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
