import { useMemo } from 'react';
import { NavigateOptions, useLocation, useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';

export default function useRouter() {
  const navigate = useNavigate();
  const { pathname, search, state } = useLocation();
  const params = useParams();
  const query = useMemo(() => qs.parse(search.replace(/[?]/g, '')), [search]);

  return {
    push: (link: string, options?: NavigateOptions) => navigate(link, options),
    replace: (link: string) =>
      navigate(link, {
        replace: true,
      }),
    pathname,
    params,
    query,
    state,
  };
}
