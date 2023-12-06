export interface IUser {
  name: string
  id: string
  role: 'user' | 'admin'
  email: string
}
export interface ISignupResponse {
  user: IUser
}

export interface ISignupRequest {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface IAccountVerificationRequest {
  email: string
  verificationToken: string
}
