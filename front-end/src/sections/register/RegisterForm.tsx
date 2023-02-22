import {
  Alert,
  AlertTitle,
  Box,
  Card,
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
import { PATH_AUTH, PATH_PAGE } from 'src/router/path';
import { Logo, MuiIcon } from 'src/assets';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { IRegisterUser } from 'src/types/Authentication';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from 'src/api/auth.api';
import useRouter from 'src/hook/useRouter';
import { IBaseResponse } from 'src/types/Reponse';
import { useSnackbar } from 'notistack';

const RootStyle = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  minWidth: 480,
  backgroundColor: theme.palette.background.default,
  boxShadow: `1px 0px 0px 1px ${alpha(theme.palette.grey[200], 0.8)}`,
}));

const RegisterSchema = yup.object().shape({
  first_name: yup.string().max(255).required('First name is required'),
  last_name: yup.string().max(255).required('Last name is required'),
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function RegisterForm() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  const { mutate: registerMutate, isLoading } = useMutation((values: IRegisterUser) => registerUser(values), {
    onSuccess: (data) => {
      if (data.status === 200) {
        push(PATH_PAGE.checkingMail);
      }
    },
    onError: (error: IBaseResponse) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  const onSubmit = (values: IRegisterUser) => {
    console.log(values);
    registerMutate(values);
  };

  const handleClickShowPassword = (name: 'password' | 'confirmPassword') => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <RootStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack mb={4} spacing={1} flexDirection="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={600} color="text.secondary">
              Sign up your account
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?
              <MuiLink
                component={Link}
                to={PATH_AUTH.login}
                variant="subtitle2"
                color="primary"
                ml={0.5}
                underline="hover"
              >
                Sign in
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
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <RHFTextField name="first_name" label="First name" />
            <RHFTextField name="last_name" label="Last name" />
          </Stack>

          <RHFTextField name="email" label="Email address" />
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword.password ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => handleClickShowPassword('password')}
                  >
                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm password"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => handleClickShowPassword('confirmPassword')}
                  >
                    {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign up
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}
