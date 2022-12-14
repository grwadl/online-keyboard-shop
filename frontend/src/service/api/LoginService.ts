import { IUser, LoginData } from '@/redux/types/reducers/login'
import { URL } from '../enums/urls'
import { get, post } from './fetch'

class LoginService {
  static async login(data: LoginData): Promise<IUser | null> {
    return post<IUser>(`${URL.PRODUCTS}/login`, { body: JSON.stringify(data) })
  }

  static async validateToken(): Promise<IUser | null> {
    const token = localStorage.getItem('token')
    if (!token) return null
    const res = await get<IUser>(`${URL.PRODUCTS}/again`)
    return res
  }
}

export { LoginService }
