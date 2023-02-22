import { Container, styled } from '@mui/material';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UpdateProfileForm } from 'src/sections/profile';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100vh',
  // alignItems: 'center',
  // justifyContent: 'center',
}));

export default function HomePage() {
  return (
    <AuthGuard>
      <RootStyle>
        <Container maxWidth="sm">
          <UpdateProfileForm />
        </Container>
      </RootStyle>
    </AuthGuard>
  );
}
