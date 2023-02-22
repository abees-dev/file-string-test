import { styled } from '@mui/material';
import { LoginForm } from 'src/sections/login';

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
export default function Login() {
  return (
    <RootStyle>
      <LoginForm />
    </RootStyle>
  );
}
