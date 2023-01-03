import { URL } from '../enums/urls'
import { getFromStorage, writeToStorage } from '../localstorage/storage'

const cookiesParams = {
  credentials: 'include' as const,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  }
}

const get = async <T>(url: string, params?: RequestInit): Promise<T> =>
  fetch(url, {
    ...params,
    ...cookiesParams,
    method: 'GET'
  }).then((res) => {
    if (!res.ok) throw res
    return res.json() as T
  })

const getAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'GET',
    headers: { ...params?.headers, Authorization: `Bearer ${token}` }
  })
  return res.json() as T
}

const post = async <T>(url: string, params: RequestInit): Promise<T> =>
  fetch(url, {
    ...params,
    ...cookiesParams,
    method: 'POST'
  }).then((res) => {
    if (!res.ok) throw new Error(`Fetching ${url} failed`)
    return res.json()
  })

const postAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage<string>('token')

  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...params?.headers }
  })
  return res.json() as T
}

const deleteReq = async <T>(url: string, params?: RequestInit): Promise<T> =>
  fetch(url, { ...params, ...cookiesParams, method: 'DELETE' }).then((res) => {
    if (!res.ok) throw new Error(`Fetching ${url} failed`)
    return res.json() as T
  })

const deleteAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'DELETE',
    headers: { ...params?.headers, Authorization: `Bearer ${token}` }
  })
  return res.json() as T
}

const put = async <T>(url: string, params?: RequestInit): Promise<T> =>
  fetch(url, { ...params, ...cookiesParams, method: 'PUT' }).then((res) => {
    if (!res.ok) throw new Error(`Fetching ${url} failed`)
    return res.json() as T
  })

const putAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'PUT',
    headers: { ...params?.headers, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })
  return res.json() as T
}

const fetchRefreshedAcessToken = async () => fetch(`${URL.USER}refresh`, { ...cookiesParams })

const intercepted = async <T>(req: (...p: any[]) => Promise<T>): Promise<T> => {
  try {
    return await req()
  } catch (e) {
    if (!(e instanceof Response)) throw e
    const response = await fetchRefreshedAcessToken()
    if (!response.ok) throw new Error(`Fetching failed`)

    const { token } = (await response.json()) as { token: string }
    writeToStorage('token', token)
    return req()
  }
}

export {
  deleteReq,
  get,
  post,
  put,
  intercepted,
  getAuthed,
  postAuthed,
  putAuthed,
  deleteAuthed,
  fetchRefreshedAcessToken
}
