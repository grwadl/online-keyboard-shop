import { IUser } from '@/redux/types/reducers/login'
import { URL } from '../enums/urls'
import { get } from './fetch'

interface LoginData {
  email: string
  password: string
}

class LoginService {
  static async login(data: LoginData) {
    return
  }

  static async validateToken(): Promise<IUser | null> {
    const token = localStorage.getItem('token')
    if (!token) return null
    const res = await get(`${URL.PRODUCTS}/again`)
    return res as IUser
  }
}

export { LoginService }
