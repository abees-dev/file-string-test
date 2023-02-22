import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { refreshToken, userLogout } from 'src/redux/slice/auth.slice';
import store from 'src/redux/store';
import { IBaseResponse, IRefreshToken } from 'src/types/Reponse';
import { getMinutesBetween } from './formatTime';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
});

function getToken() {
  const { accessToken } = store.getState().auth;
  return accessToken;
}

function setToken(token: string) {
  store.dispatch(refreshToken(token));
}

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const { dispatch } = store;
  const accessToken = getToken();

  try {
    const payload = accessToken && (jwtDecode(accessToken as string) as JwtPayload);

    const { retry } = config;

    const whiteListUrl = !['/auth/login', '/auth/register'].includes(config.url as string);

    console.log(payload && payload.exp && getMinutesBetween(payload.exp * 1000));

    if (payload && payload.exp && getMinutesBetween(payload.exp * 1000) < 1 && whiteListUrl && !retry) {
      config.retry = true;
      const response: AxiosResponse<IBaseResponse<IRefreshToken>> = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
        withCredentials: true,
      });
      console.log('response:', response);

      dispatch(refreshToken(response.data.data.access_token));
    }
  } catch (error) {
    dispatch(userLogout());
  }

  config.headers['Authorization'] = `Bearer ${getToken()}`;

  return config;
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer `;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) =>
    Promise.reject((error.response && error.response.data) || { message: error.message, status: 500 })
);

export default axiosInstance;
