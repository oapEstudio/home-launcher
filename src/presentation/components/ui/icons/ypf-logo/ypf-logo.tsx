import YPFLogo from './logo-ypf.svg';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { CustomStack } from '../../stack/Stack';
import { colors } from '../../../../common/colors';
import './ypf-logo.css';

interface IYPFLogo{
  link: string
}

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: 'auto',
  height: 'auto',
  gap: 0, 
});

const LogoImage = styled('img')({
  //width: '5.5625rem',     
  height: '2rem',
           
  objectFit: 'contain',    
});

const Divider = styled('span')({
  display: 'inline-block',
  width: 0,                 
  height: '2.25rem',       
  borderLeft: `1px solid ${colors.palette.primary.main}`,
  margin: '0 .375rem',     
  opacity: 1,
});

const LogoText = styled('span')({
  fontFamily: 'Open Sans, Arial, sans-serif',
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '1rem',       
  lineHeight: 1,          
  letterSpacing: '0.29em',
  color: '#AAAAAA'
});

const LogoYPF: React.FC<IYPFLogo> = ({link}) => (
  <Container>  
      <CustomStack direction='row' sx={{justifyContent: 'center',alignItems: 'center'}}>
        <LogoImage src={YPFLogo} alt={'LOGO Back-Office'} />
        <Divider sx={{height: {xs: '1.25rem'}}}/>
        <LogoText>EXTRANET</LogoText>
      </CustomStack>
  </Container>
);

export default LogoYPF;
