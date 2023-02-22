export interface IBaseResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

export interface IUpload {
  _id: string;
  url: string;
  mimetype: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  nick_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  gender: number;
  address: string;
  day_of_birth: string;
  avatar: string;
  full_name: string;
  is_verified: number;
  phone: string;
  city: string;
  country: string;
}

export interface ILoginResponse {
  access_token: string;
  user: IUser;
}

export interface IRefreshToken {
  access_token: string;
}
