import { Button, Typography, styled } from '@mui/material';
import SendMail from 'src/assets/SendMail';
import useRouter from 'src/hook/useRouter';
import { PATH_AUTH } from 'src/router/path';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#fbfbfb',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));
export default function CheckingMail() {
  const { push } = useRouter();

  return (
    <RootStyle>
      <SendMail
        sx={{
          width: '40%',
        }}
      />
      <Typography align="center" variant="body1" color={'text.secondary'}>
        We have sent you an email with a link to active account.
        <br /> Please check your email.
      </Typography>

      <Button variant="contained" size="large" sx={{ mt: 1 }} onClick={() => push(PATH_AUTH.login)}>
        Go to login
      </Button>
    </RootStyle>
  );
}
