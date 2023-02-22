import { createBrowserRouter } from 'react-router-dom';
import GuestGuard from 'src/guards/GuestGuard';
import Layout from 'src/layout';
import Login from 'src/pages/auth/Login';
import Register from 'src/pages/auth/Register';
import HomePage from 'src/pages/home';
import CheckingMail from 'src/pages/home/CheckingMail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ element: <HomePage />, index: true }],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />,
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
    ],
  },
  { path: 'checking-mail', element: <CheckingMail /> },
  // {
  //   path: '*',
  //   errorElement: <NotFound />,
  //   element: <NotFound />,
  // },
]);
