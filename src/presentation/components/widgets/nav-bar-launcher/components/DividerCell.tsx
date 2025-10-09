import { styled } from '@mui/material/styles';
import { colors } from '../../../../common/colors';

export const DividerCell = styled('div')(({ theme }) => ({
  alignSelf: 'stretch',           
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  width: 'auto',
  minWidth: 64,

  backgroundColor: '#FAFAFA',
  borderLeft:  `1px solid ${colors.palette.primary.main}`,
  borderRight: `1px solid ${colors.palette.primary.main}`,

  position: 'relative',          
}));
