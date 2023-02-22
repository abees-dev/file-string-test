import { ReactElement, ReactNode, useEffect } from 'react';
import useRouter from 'src/hook/useRouter';
import { useAppSelector } from 'src/redux/hook';

interface IGuestGuard {
  children: ReactNode;
}

export default function GuestGuard({ children }: IGuestGuard) {
  const { push } = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      push('/');
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
