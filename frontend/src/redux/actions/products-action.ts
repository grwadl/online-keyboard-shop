import { ProductService } from '@/service/api/ProductService'
import { cached } from '@/service/cache'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsActions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { IProduct } from '../types/reducers/products'

export interface ReturnType {
  keyboards: IProduct[]
  totalProducts: number
}

const cachedGetProductReq = cached(() => ProductService.get())

const getAllProducts = createAsyncThunk<ReturnType, void, AsyncThunkConfig>(ProductsActions.GET_ALL, async () => {
  const [keyboards, totalProducts] = await cachedGetProductReq()

  return { keyboards, totalProducts }
})

const getQuantityOfProducts = createAsyncThunk<number, void, AsyncThunkConfig>(
  ProductsActions.GET_QUANTITY,
  async (_, { extra: { ProductService } }) => await ProductService.countProduct()
)

const changeFilteredProducts = createAsyncThunk<ReturnType, string, AsyncThunkConfig>(
  ProductsActions.CHANGE_FILTERS,
  async (query) => {
    const actualQuery = query ? `?${query}` : ''

    const [keyboards, totalProducts] = await ProductService.get(actualQuery)
    return { keyboards, totalProducts }
  }
)

export { getAllProducts, changeFilteredProducts, getQuantityOfProducts }
