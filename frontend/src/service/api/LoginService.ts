import { IUser, LoginData } from '@/redux/types/reducers/login'
import { URL } from '../enums/urls'
import { writeToStorage } from '../localstorage/storage'
import { fetchRefreshedAcessToken, get, post } from './fetch'

class LoginService {
  static async login(data: LoginData): Promise<IUser | null> {
    const user = await post<IUser>(`${URL.USER}sign-in`, { body: JSON.stringify(data) })
    writeToStorage('token', user.token)
    return user
  }

  static async validateToken(): Promise<IUser | null> {
    const res = await fetchRefreshedAcessToken()
    if (!res.ok) return null
    const { token: newToken, ...user } = (await res.json()) as IUser

    writeToStorage('token', newToken)

    return { ...user, token: newToken }
  }

  static async confirmEmail(token?: string): Promise<IUser | null> {
    if (!token) throw new Error('Invalid token provided')
    return get<IUser>(`${URL.USER}confirm/${token}`)
  }

  static async register(data: LoginData): Promise<void> {
    return post<void>(`${URL.USER}sign-up`, { body: JSON.stringify(data) })
  }

  static async logOut(): Promise<void> {
    return get<void>(`${URL.USER}log-out`)
  }
}

export { LoginService }
