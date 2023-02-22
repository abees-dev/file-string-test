function paths(path: string, subPath: string) {
  return `${path}/${subPath}`;
}

const ROOT_AUTH = '/auth';
const ROOT_PAGE = '/';

export const PATH_PAGE = {
  root: ROOT_PAGE,
  checkingMail: '/checking-mail',
};

export const PATH_AUTH = {
  root: ROOT_AUTH,
  login: paths(ROOT_AUTH, 'login'),
  register: paths(ROOT_AUTH, 'register'),
};

export const PATH_COMMON = {
  notFound: '/404',
};
