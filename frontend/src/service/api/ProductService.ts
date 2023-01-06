import { ICart } from '@/redux/types/reducers/login'
import { IProduct } from '@/redux/types/reducers/products'
import { URL } from '../enums/urls'
import { deleteAuthed, get, get as getReq, postAuthed, putAuthed } from './fetch'

class ProductService {
  static async get(params = ''): Promise<IProduct[]> {
    return getReq<IProduct[]>(`${URL.PRODUCTS}${params}`)
  }

  static async getOne(id: number): Promise<IProduct> {
    return get<IProduct>(`${URL.PRODUCTS}${id}`)
  }

  static async addToCart(id: number): Promise<ICart> {
    return postAuthed(URL.CART, { body: JSON.stringify({ id }) })
  }

  static async removeFromCart(id: number): Promise<ICart> {
    return deleteAuthed(`${URL.CART}${id}`)
  }

  static async changeCart(id: number, quantity: number): Promise<ICart> {
    return putAuthed(`${URL.CART}${id}`, { body: JSON.stringify({ quantity }) })
  }
}

export { ProductService }
