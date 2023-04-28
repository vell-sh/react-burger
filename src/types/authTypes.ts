export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
export interface IResetPassword {
  password: string;
  token: string;
}

export interface IForgotPassword {
  email: string;
}
