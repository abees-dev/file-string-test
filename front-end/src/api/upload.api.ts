import axios, { AxiosResponse } from 'axios';
import { IBaseResponse, IUpload } from 'src/types/Reponse';

export const uploadSingle = async (data: FormData): Promise<IBaseResponse<IUpload>> => {
  const res: AxiosResponse<IBaseResponse<IUpload>> = await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_UPLOAD_API_URL}/upload/single`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  });
  return res.data;
};
