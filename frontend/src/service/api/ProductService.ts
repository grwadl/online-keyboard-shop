import { IProduct } from '@/redux/types/reducers/products'
import { URL } from '../enums/urls'
import { get, get as getReq, postAuthed } from './fetch'

class ProductService {
  static async get(params = ''): Promise<IProduct[]> {
    return getReq<IProduct[]>(`${URL.PRODUCTS}${params}`)
  }

  static async getOne(id: number): Promise<IProduct> {
    return get<IProduct>(`${URL.PRODUCTS}${id}`)
  }

  static async addToCart(id: number): Promise<IProduct> {
    return postAuthed(URL.CART, { body: JSON.stringify({ id }) })
  }
}

export { ProductService }
