import React from 'react'
import { CustomPersonalityAccordion } from '../../../ui/accordion/Accordion';
import { CustomStack } from '../../../ui/stack/Stack';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../ui/divider';
import { colors } from '../../../../common/colors';

export type NotificationItem = {
  id: string | number;
  notificationTypeId: string | number;   
  title: string;                         
  description: React.ReactNode;
  read: boolean;          
  cta?: { title: string; href: string; target?: string; rel?: string }; 
  accordionProps?: React.ComponentPropsWithoutRef<typeof CustomPersonalityAccordion>;
};

const renderHeader = (item: NotificationItem, iconResolver?: (typeId: NotificationItem['notificationTypeId']) => React.ReactNode): React.ReactNode => (
    <CustomStack spacing={2} direction="row" sx={{ alignItems: 'end' }}>
     
      <>{iconResolver?.(item.notificationTypeId) ?? null}</>
      <Typography variant="body2" fontWeight="bold">
        {item.title}
      </Typography>
    </CustomStack>
  );

  const renderDetails = (item: NotificationItem): React.ReactNode => (
    <>
      
      <Typography variant="subtitle2" fontWeight={600}>{item.description}</Typography>
      <br />
      {item.cta?.title && item.cta?.href ? (
        <div style={{ display: 'flex', marginTop: 8, justifyContent: 'center'}}>
          <a
            href={item.cta.href}
            target={item.cta.target ?? '_blank'}
            rel={item.cta.rel ?? 'noopener noreferrer'}
            style={{ fontWeight: 'bold', color:  colors.palette.primary.main }}
          >
              {item.cta.title}
          </a>
        </div>
      ) : null}
    </>
  );

export const NotificationBellRow: React.FC<{
    titleLeft: string;
    titleRight?: string;
    items: NotificationItem[];
    iconResolver?: (typeId: NotificationItem['notificationTypeId']) => React.ReactNode;
  }> = ({ titleLeft, titleRight, items, iconResolver }) =>{
    
  

    
    return (
        <>
          {
            titleLeft && <CustomStack direction="row" sx={{ justifyContent: 'space-between', m: '2%' }}>
              <small style={{ color: 'rgb(143, 143, 143)' }}>{titleLeft}</small>
              <small style={{ color: 'rgb(143, 143, 143)' }}>{titleRight ?? '-'}</small>
            </CustomStack>
          }
          <CustomDivider />
          
          {items.length === 0 ? 
            
            <Typography 
                textAlign={'center'}
                margin={'2%'}    
                component={'small'}
                fontSize={10}
                color='rgb(143, 143, 143)'
            >
                 Sin notificaciones
            </Typography> : 

            items.map((it, idx) => (
                <React.Fragment key={it.id ?? idx}>
                    <CustomPersonalityAccordion
                    sx={{ margin: '0px !important' }}
                    header={renderHeader(it,iconResolver)}
                    details={renderDetails(it)}             
                  />
                  {idx < items.length - 1 && <CustomDivider />}
                </React.Fragment>
            ))
          }
        </>
      )
  }
