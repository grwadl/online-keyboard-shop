import { HttpError } from '@/utils/HttpError'
import { getFromStorage } from '../localstorage/storage'

export const cookiesParams = {
  credentials: 'include' as const,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  }
}

const get = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const res = await fetch(url, {
    ...params,
    ...cookiesParams,
    method: 'GET'
  })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const getAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'GET',
    headers: { ...params?.headers, Authorization: `Bearer ${token}` }
  })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const post = async <T>(url: string, params: RequestInit): Promise<T> => {
  const res: Response = await fetch(url, {
    ...params,
    ...cookiesParams,
    method: 'POST'
  })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const postAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage<string>('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...params?.headers }
  })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const deleteReq = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const res = await fetch(url, { ...params, ...cookiesParams, method: 'DELETE' })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const deleteAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'DELETE',
    headers: { ...params?.headers, Authorization: `Bearer ${token}` }
  })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const put = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const res = await fetch(url, { ...params, ...cookiesParams, method: 'PUT' })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

const putAuthed = async <T>(url: string, params?: RequestInit): Promise<T> => {
  const token = getFromStorage('token')
  if (!token) throw new Error('there is no token in storage')
  const res = await fetch(url, {
    ...params,
    method: 'PUT',
    headers: { ...params?.headers, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  })
  const resWithJson = await res.json()
  if (!res.ok) throw new HttpError(resWithJson?.message ?? `Fetching ${url} failed`, { statusCode: res.status, url })
  return resWithJson
}

export { deleteReq, get, post, put, getAuthed, postAuthed, putAuthed, deleteAuthed }
