export interface IRegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IVerifyMail {
  email: string;
  code: string;
}
