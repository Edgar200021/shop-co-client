export interface IUserResponse {
  userId: number
  name: string
  role: 'user' | 'admin'
  email: string
}

export interface IUserRequest {
  name: string
  email: string
  password: string
}

export interface IRegisterResponse {
	msg: string
}

export interface IAccountVerificationRequest {
	email: string ,
	verificationToken: string
}