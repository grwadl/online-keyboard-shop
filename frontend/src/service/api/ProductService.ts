import { IProduct } from '@/redux/types/reducers/products'
import { URL } from '../enums/urls'
import { get as getReq } from './fetch'

class ProductService {
  static async get() {
    return getReq<IProduct[]>(URL.PRODUCTS)
  }
}

export { ProductService }
