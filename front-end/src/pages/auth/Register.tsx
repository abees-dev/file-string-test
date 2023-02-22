import { styled } from '@mui/material';
import { RegisterForm } from 'src/sections/register';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#fbfbfb',
  display: 'flex',
  minHeight: '100vh',
  maxHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));
export default function Register() {
  return (
    <RootStyle>
      <RegisterForm />
    </RootStyle>
  );
}
