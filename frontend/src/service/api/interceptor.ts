import { HttpError } from '@/utils/HttpError'
import { ReduxError } from '@/utils/ReduxError'
import { URL } from '../enums/urls'
import { writeToStorage } from '../localstorage/storage'
import { cookiesParams } from './fetch'

const fetchRefreshedAccessToken = async () => fetch(`${URL.USER}refresh`, { ...cookiesParams })

const intercepted = async <T>(req: (...p: any[]) => Promise<T>): Promise<T> => {
  try {
    return await req()
  } catch (e) {
    if (!(e instanceof Response || e instanceof HttpError)) throw e
    const response = await fetchRefreshedAccessToken()
    if (!response.ok) throw new ReduxError('refreshing access token failed', response.status)

    const { token } = (await response.json()) as { token: string }
    writeToStorage('token', token)
    return req()
  }
}

export { fetchRefreshedAccessToken, intercepted }
