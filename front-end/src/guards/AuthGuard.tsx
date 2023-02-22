import { ReactElement, useEffect } from 'react';
import useRouter from 'src/hook/useRouter';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { userLogout } from 'src/redux/slice/auth.slice';
import { PATH_AUTH } from 'src/router/path';

interface IAuthGuard {
  children: ReactElement;
}

export const AuthGuard = ({ children }: IAuthGuard) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { replace, pathname } = useRouter();

  const handleChangeLocalStorage = () => {
    const authRedux = localStorage.getItem('redux-user');

    if (authRedux) {
      const { user: reduxUser, isAuthenticated: isAuthen } = JSON.parse(authRedux);

      if (JSON.parse(reduxUser)?.id !== user?.id || !isAuthen) {
        dispatch(userLogout());
      }
    } else {
      dispatch(userLogout());
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      replace(PATH_AUTH.login);
    }

    window.addEventListener('storage', handleChangeLocalStorage);

    return () => {
      window.removeEventListener('storage', handleChangeLocalStorage);
    };
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};
