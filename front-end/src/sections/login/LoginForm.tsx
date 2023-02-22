import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack,
  Typography,
  alpha,
  styled,
} from '@mui/material';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from 'src/router/path';
import { Logo, MuiIcon } from 'src/assets';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import useRouter from 'src/hook/useRouter';
import { useMutation } from '@tanstack/react-query';
import { loginUser, verifyMail } from 'src/api/auth.api';
import { ILoginUser, IVerifyMail } from 'src/types/Authentication';
import { IBaseResponse } from 'src/types/Reponse';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from 'src/redux/hook';
import { loginSuccess } from 'src/redux/slice/auth.slice';

const RootStyle = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  minWidth: 480,
  backgroundColor: theme.palette.background.default,
  boxShadow: `1px 0px 0px 1px ${alpha(theme.palette.grey[200], 0.8)}`,
}));

const LoginSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});

export default function LoginForm() {
  const { query, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const { mutate: verifyEmailMutate, error } = useMutation((values: IVerifyMail) => verifyMail(values), {
    onSuccess: (data) => {
      if (data.status === 200) {
        push(`${PATH_AUTH.login}?verify=success`);
      }
    },
    onError: (error: IBaseResponse) => {
      push(`${PATH_AUTH.login}?verify=error`);
    },
  });

  const { mutateAsync: loginMutate, isLoading } = useMutation((values: ILoginUser) => loginUser(values), {
    onSuccess: (data) => {
      if (data.status === 200) {
        dispatch(loginSuccess(data.data));
        enqueueSnackbar(data.message, { variant: 'success' });
      }
    },
    onError: (error: IBaseResponse) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  useEffect(() => {
    if (query.email) {
      verifyEmailMutate({ email: query.email as string, code: query.code as string });
    }
  }, [query]);

  const defaultValues = {
    email: '',
    password: '',
  };

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (values: ILoginUser) => {
    await loginMutate(values);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <RootStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack mb={2} spacing={1} flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={600} color="text.secondary">
              Sign in your account
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              New user?
              <MuiLink
                component={Link}
                to={PATH_AUTH.register}
                variant="subtitle2"
                color="primary"
                ml={0.5}
                underline="hover"
              >
                Create an account
              </MuiLink>
            </Typography>
          </Box>
          <Logo
            sx={{
              width: 32,
              height: 32,
            }}
          />
        </Stack>

        {query?.verify && query?.verify === 'success' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Verify success</AlertTitle>
            Your account has been activated successfully
          </Alert>
        )}

        {query?.verify && query?.verify === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Verify error</AlertTitle>
            {error?.message}
          </Alert>
        )}

        {query?.verify && query?.verify === 'progressing' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <AlertTitle
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography>Verify progressing</Typography>
              <CircularProgress color="info" size={24} />
            </AlertTitle>
            Your account is in the process of being verified
          </Alert>
        )}

        <Stack spacing={2}>
          <RHFTextField name="email" label="Email address" />
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end" onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack flexDirection="row" justifyContent="flex-end">
            <MuiLink
              component={Link}
              to="#"
              variant="body2"
              color="text.secondary"
              underline="hover"
              sx={{ width: 'fit-content' }}
            >
              Forgot password?
            </MuiLink>
          </Stack>
          <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isLoading}>
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// Don&apos;t have an account
