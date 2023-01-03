import { IProduct } from './products'

interface ILogin {
  user: null | IUser
  error: string | null
  loading: boolean
}

interface LoginData {
  email: string
  password: string
}

interface ICart {
  id: number
  quantity: number
  product: IProduct
}

interface IUser extends LoginData {
  email: string
  password: string
  token: string
  cart: ICart[]
}

export type { ILogin, IUser, LoginData, ICart }
