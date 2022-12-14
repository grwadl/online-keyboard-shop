interface ILogin {
  user: null | IUser
}

interface LoginData {
  email: string
  password: string
}

interface IUser extends LoginData {
  email: string
  password: string
}

export type { ILogin, IUser, LoginData }
