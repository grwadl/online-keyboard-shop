interface ILogin {
  user: null | IUser
  error: string | null
}

interface LoginData {
  email: string
  password: string
}

interface IUser extends LoginData {
  email: string
  password: string
  token: string
}

export type { ILogin, IUser, LoginData }
