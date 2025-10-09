// Stepper.tsx
import React from 'react';
import { styled } from '@mui/material/styles';

export interface StepType {
  show: boolean;
  active: boolean;
  icon: any;
  title: string;
}

interface StepperProps {
  steps: StepType[];
}

const Row = styled('div')({});

const StepperWrapper = styled('div')(({ theme }) => ({
  width: '100% !important',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '30px',
  alignItems: 'center',
  zIndex: 0,
  justifyContent: 'space-between',
  [theme.breakpoints.down('xs')]: {
    // equiv. a max-device-height:450px fallback
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingRight: '10px',
  },
}));

const Container = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'last' && prop !== 'show' }
)<{ last: boolean; show: boolean }>(({ last, show }) => ({
  display: show ? 'flex' : 'none',
  position: 'relative',
  alignItems: 'center',
  minWidth: last ? 'fit-content' : '100px',
}));

const StepBtn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1,
});

const StepContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Circle = styled(
  'button',
  { shouldForwardProp: (prop) => prop !== 'active' }
)<{ active: boolean }>(({ theme, active }) => ({
  borderRadius: '50%',
  width: 40,
  height: 40,
  border: 'none',
  backgroundColor: active ? theme.palette.primary.main : '#C4C4C4',
  color: active ? theme.palette.common.white : '#727272',
  fontSize: 'x-large',
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Title = styled(
  'div',
  { shouldForwardProp: (prop) => prop !== 'active' }
)<{ active: boolean }>(({ theme, active }) => ({
  marginTop: theme.spacing(1),
  fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
  fontSize: 16,
  color: active ? theme.palette.primary.main : 'inherit',
}));

const Line = styled('div')(({ theme }) => ({
  flex: 1,
  height: 3,
  backgroundColor: theme.palette.divider,
  marginTop: -20,
  marginLeft: -25,
  marginRight: -20,
}));

const StepNavigationBackOffice: React.FC<StepperProps> = ({ steps }) => (
  <Row className="row">
    <StepperWrapper className="stepper justify-content-between">
      {steps.map((step, idx) => {
        const last = idx === steps.length - 1;
        return (
          <Container key={idx} last={last} show={step.show} className="step-container">
            <StepBtn className="step-btn">
              <StepContent className="step-content">
                <Circle active={step.active} className="step">
                  {step.icon}
                </Circle>
                <Title active={step.active} className="title">
                  {step.title}
                </Title>
              </StepContent>
            </StepBtn>
            {!last && <Line className="step-line" />}
          </Container>
        );
      })}
    </StepperWrapper>
  </Row>
);

export default StepNavigationBackOffice;
