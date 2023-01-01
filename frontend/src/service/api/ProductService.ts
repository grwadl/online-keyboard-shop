import { IProduct } from '@/redux/types/reducers/products'
import { URL } from '../enums/urls'
import { get as getReq, getAuthed, intercepted } from './fetch'

class ProductService {
  static async get(params = '') {
    return getReq<IProduct[]>(`${URL.PRODUCTS}${params}`)
  }

  static async getOne(id: number) {
    return intercepted(() => getAuthed<IProduct>(`${URL.PRODUCTS}${id}`))
  }
}

export { ProductService }
