import { ProductService } from '@/service/api/ProductService'
import { cached, cachedMap } from '@/service/cache'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsActions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/internal'
import { IProduct } from '../types/reducers/products'
import { ReturnType } from './return-type'

interface GetCurrentReturnType {
  keyboard: IProduct
}

const cachedGetRelatedProducts = cached(() => ProductService.get('?limit=15'))

const fetchLatestProducts = createAsyncThunk<Omit<ReturnType, 'totalProducts'>, void, AsyncThunkConfig>(
  ProductsActions.GET_LATEST,
  async () => {
    const [keyboards] = await cachedGetRelatedProducts()
    return { keyboards }
  }
)

const cacheFetchCurrentProduct = cachedMap<IProduct>()

const fetchCurrentProduct = createAsyncThunk<GetCurrentReturnType, number, AsyncThunkConfig>(
  ProductsActions.GET_CURRENT,
  async (id) => {
    const keyboard = await cacheFetchCurrentProduct(() => ProductService.getOne(+id), id + '')
    if (!keyboard) throw new Error('not Found')
    return { keyboard }
  }
)

export { fetchLatestProducts, fetchCurrentProduct }
