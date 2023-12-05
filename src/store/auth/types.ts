export interface IUserResponse {
  userId: string
  name: string
  role: 'user' | 'admin'
  email: string
}

export interface IUserRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface IRegisterResponse {
  msg: string
}

export interface IAccountVerificationRequest {
  email: string
  verificationToken: string
}
