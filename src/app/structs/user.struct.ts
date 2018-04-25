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
