const get = async <T>(url: string, params?: RequestInit): Promise<T> =>
  fetch(url, { ...params, method: 'GET' })
    .then((res) => res.json() as T)
    .catch((e) => e)

const post = async <T>(url: string, params: RequestInit): Promise<T> =>
  fetch(url, { ...params, method: 'POST' })
    .then((res) => res.json() as T)
    .catch((e) => e)

const deleteReq = async <T>(url: string, params?: RequestInit): Promise<T> =>
  fetch(url, { ...params, method: 'DELETE' })
    .then((res) => res.json() as T)
    .catch((e) => e)

const put = async <T>(url: string, params?: RequestInit): Promise<T> =>
  fetch(url, { ...params, method: 'PUT' })
    .then((res) => res.json() as T)
    .catch((e) => e)

export { deleteReq, get, post, put }
