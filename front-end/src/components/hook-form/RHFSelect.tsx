import { TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFSelectProp {
  name: string;
  children: ReactNode;
}

type IRHFSelectType = RHFSelectProp & TextFieldProps;

export default function RHFSelect({ name, children, ...other }: IRHFSelectType) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField select fullWidth error={!!error} helperText={error?.message} {...other} {...field}>
          {children}
        </TextField>
      )}
    />
  );
}
