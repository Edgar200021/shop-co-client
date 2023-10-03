export interface IUserResponse {
  userId: number
  name: string
  role: 'user' | 'admin'
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