/**
 * @public string email
 * @public string password
 */
export interface SigninStruct {
  email: string;
  password: string;
}

export interface SignupStruct {
  email: string;
  nickname: string;
  password: string;
  gender: number;
  // captcha: string;
}

export interface UserData {
  nickname: string;
  email: string;
  sign: string;
  address: string;
  birthday: any;
  gender: number;
  intro: string;
}
