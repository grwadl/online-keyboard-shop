import { IUser, LoginData } from '@/redux/types/reducers/login'
import { URL } from '../enums/urls'
import { writeToStorage } from '../localstorage/storage'
import { fetchRefreshedAcessToken, post } from './fetch'

class LoginService {
  static async login(data: LoginData): Promise<IUser | null> {
    const user = await post<IUser>(`${URL.USER}sign-in`, { body: JSON.stringify(data) })
    writeToStorage('token', user.token)
    return user
  }

  static async validateToken(token: string): Promise<IUser | null> {
    if (!token) return null
    const res = await fetchRefreshedAcessToken()
    if (!res.ok) return null
    const { token: newToken, ...user } = (await res.json()) as IUser
    console.log(newToken)

    writeToStorage('token', newToken)

    return { ...user, token: newToken }
  }

  static async register(data: LoginData): Promise<IUser | null> {
    return post<IUser>(`${URL.USER}sign-up`, { body: JSON.stringify(data) })
  }
}

export { LoginService }
