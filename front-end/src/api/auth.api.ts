import { Axios, AxiosResponse } from 'axios';
import { ILoginUser, IRegisterUser, IVerifyMail } from 'src/types/Authentication';
import { IBaseResponse, ILoginResponse } from 'src/types/Reponse';
import axiosInstance from 'src/utils/axios';

export const registerUser = async (data: IRegisterUser) => {
  const response: AxiosResponse<IBaseResponse> = await axiosInstance({
    method: 'POST',
    url: '/auth/register',
    data,
  });
  return response.data;
};

export const loginUser = async (data: ILoginUser) => {
  const response: AxiosResponse<IBaseResponse<ILoginResponse>> = await axiosInstance({
    method: 'POST',
    url: '/auth/login',
    data,
  });
  return response.data;
};

export const verifyMail = async (data: IVerifyMail) => {
  const response: AxiosResponse<IBaseResponse> = await axiosInstance({
    method: 'POST',
    url: '/auth/verify-email',
    data,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response: AxiosResponse<IBaseResponse> = await axiosInstance({
    method: 'POST',
    url: '/auth/logout',
  });
  return response.data;
};
