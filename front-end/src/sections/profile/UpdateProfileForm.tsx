import { Avatar, Container, IconButton, MenuItem, Stack, Typography, alpha, styled } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useRef, useState } from 'react';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFSelect from 'src/components/hook-form/RHFSelect';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { IUpdateProfileUser } from 'src/types/InputType';
import { useMutation } from '@tanstack/react-query';
import { updateProfileUser } from 'src/api/user.api';
import { uploadSingle } from 'src/api/upload.api';
import { updateUser } from 'src/redux/slice/auth.slice';
import { getAvatarUrl } from 'src/utils/getAvatarUrl';
import { useSnackbar } from 'notistack';
import { IBaseResponse } from 'src/types/Reponse';

const RootStyle = styled('div')(({ theme }) => ({}));
const AvatarStyle = styled('div')(({ theme }) => ({
  width: 120,
  height: 120,
  border: `1px dashed ${theme.palette.action.focus}`,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
}));
const AvatarOverlayStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 100,
  height: 100,
  borderRadius: '50%',
  left: '50%',
  transform: 'translate(-50%)',
  backgroundColor: alpha(theme.palette.grey[500], 0.5),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));

const ProfileSchema = Yup.object().shape({
  // first_name: Yup.string().required('First name is required'),
  // last_name: Yup.string().required('Last name is required'),
  // day_of_birth: Yup.string().required('Day of birth is required'),
  // phone: Yup.string().required('Phone is required'),
  // address: Yup.string().max(255).required('Address is required'),
  // city: Yup.string().max(255).required('City is required'),
  // country: Yup.string().max(255).required('Country is required'),
  // avatar: Yup.string().required('Avatar is required'),
});

interface IListlabel {
  label: string;
  name: keyof IUpdateProfileUser;
  disabled: boolean;
  editField: string;
}

const LIST_LABEL: IListlabel[] = [
  {
    label: 'Full Name',
    name: 'full_name',
    disabled: false,
    editField: 'text',
  },
  {
    label: 'Nick Name',
    name: 'nick_name',
    disabled: false,
    editField: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    disabled: true,
    editField: 'text',
  },
  {
    label: 'Gender',
    name: 'gender',
    disabled: false,
    editField: 'select',
  },
  {
    label: 'Phone',
    name: 'phone',
    disabled: false,
    editField: 'text',
  },
  {
    label: 'Address',
    name: 'address',
    disabled: false,
    editField: 'text',
  },
  {
    label: 'City',
    name: 'city',
    disabled: false,
    editField: 'text',
  },
  {
    label: 'Country',
    name: 'country',
    disabled: false,
    editField: 'text',
  },
];

const GenderSelect = [
  {
    label: '',
    value: 0,
  },
  {
    label: 'Male',
    value: 1,
  },
  {
    label: 'Female',
    value: 2,
  },
  {
    label: 'Other',
    value: 3,
  },
];

export default function UpdateProfileForm() {
  const [overlay, setOverlay] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const defaultValues: IUpdateProfileUser = {
    full_name: user?.full_name || '',
    nick_name: user?.nick_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || 0,
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
    avatar: user?.avatar || '',
    last_name: user?.last_name || '',
  };

  const methods = useForm({
    defaultValues,

    resolver: yupResolver(ProfileSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnMouseEnter = () => {
    setOverlay(true);
  };

  const handleOnMouseLeave = () => {
    setOverlay(false);
  };

  const handleSelectFile = () => {
    inputRef.current?.click();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
      setFile(file);
    }
  };

  const { mutateAsync: updateProfile, isLoading } = useMutation(
    (values: IUpdateProfileUser) => updateProfileUser(values),
    {
      onSuccess: (data, variable) => {
        if (data.status === 200) {
          dispatch(updateUser(variable));
          enqueueSnackbar(data.message, { variant: 'success' });
        }
      },
      onError: (error: IBaseResponse) => {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    }
  );

  const onSubmit = async (values: IUpdateProfileUser) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const upload = await uploadSingle(formData);

      if (upload.status === 200) {
        setValue('avatar', upload.data.url);
      }
    }

    await updateProfile(values);
  };

  return (
    <RootStyle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <AvatarStyle onMouseLeave={handleOnMouseLeave} onMouseMove={handleOnMouseEnter}>
          <Avatar src={preview ? preview : getAvatarUrl(user?.avatar)} sx={{ width: 100, height: 100 }} />
          {overlay && (
            <AvatarOverlayStyle onClick={handleSelectFile}>
              <PhotoCameraIcon sx={{ color: 'white' }} />
            </AvatarOverlayStyle>
          )}
          <input type="file" ref={inputRef} hidden accept="image/*" onInput={handleOnChange} />
        </AvatarStyle>

        <Stack spacing={2}>
          {LIST_LABEL.map((item) => (
            <Stack key={item.name} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start" sx={{ minWidth: 120 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
              </Stack>
              {item.editField === 'text' ? (
                <RHFTextField name={item.name} disabled={item.disabled} size="small" />
              ) : (
                <RHFSelect name={item.name} size="small">
                  {GenderSelect.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}
            </Stack>
          ))}
          <LoadingButton variant="contained" loading={isLoading} type="submit">
            update
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}
