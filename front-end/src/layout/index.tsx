import { styled } from '@mui/material';
import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'src/guards/AuthGuard';
import Header from './header';

const RootStyle = styled('div')(() => ({
  display: 'flex',
}));

const MainStyle = styled('main')(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(15),
  paddingRight: theme.spacing(4),
  paddingBottom: theme.spacing(15),
}));

export default function Layout() {
  return (
    <AuthGuard>
      <>
        <Header />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </>
    </AuthGuard>
  );
}
