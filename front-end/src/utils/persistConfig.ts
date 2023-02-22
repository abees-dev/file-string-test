import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const storage = createWebStorage('local');

export const userPersist = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
};
