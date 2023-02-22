import { AxiosResponse } from 'axios';
import { IUpdateProfileUser } from 'src/types/InputType';
import { IBaseResponse } from 'src/types/Reponse';
import axiosInstance from 'src/utils/axios';

export const updateProfileUser = async (data: Partial<IUpdateProfileUser>) => {
  const response: AxiosResponse<IBaseResponse> = await axiosInstance({
    method: 'POST',
    url: '/user/update',
    data,
  });
  return response.data;
};
