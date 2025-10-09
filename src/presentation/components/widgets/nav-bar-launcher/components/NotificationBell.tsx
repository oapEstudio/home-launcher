import React from 'react'
import CustomBadge from '../../../ui/badge/CustomBadge'
import { BellIcon } from '../../../ui/icons'
import { colors } from '../../../../common/colors';
import  IconButton  from '@mui/material/IconButton';

export const NotificationBell = () => {
  return (
        <IconButton  style={{color: colors.palette.primary.main}}>
            <CustomBadge count={10} color='error' >
                  <BellIcon  />
            </CustomBadge>
        </IconButton>

  )
}
