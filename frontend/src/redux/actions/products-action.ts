import { ProductService } from '@/service/api/internal'
import { cached, cachedMap } from '@/service/cache'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsActions } from '../enums/actions'
import { AsyncThunkConfig } from '../internal'
import { IProduct } from '../types/reducers/products'
import { ReturnType } from './return-type'

const cachedGetProductReq = cached(() => ProductService.get())

const getAllProducts = createAsyncThunk<ReturnType, void, AsyncThunkConfig>(ProductsActions.GET_ALL, async () => {
  const [keyboards, totalProducts] = await cachedGetProductReq()

  return { keyboards, totalProducts }
})

const cachedGetQuantityReq = cached(() => ProductService.countProduct())

const getQuantityOfProducts = createAsyncThunk<number, void, AsyncThunkConfig>(
  ProductsActions.GET_QUANTITY,
  async () => await cachedGetQuantityReq()
)

const cachedFilters = cachedMap<[IProduct[], number]>()

const changeFilteredProducts = createAsyncThunk<ReturnType, string, AsyncThunkConfig>(
  ProductsActions.CHANGE_FILTERS,
  async (query) => {
    const actualQuery = query ? `?${query}` : ''
    const [keyboards, totalProducts] = await cachedFilters(() => ProductService.get(actualQuery), actualQuery)
    return { keyboards, totalProducts }
  }
)

export { getAllProducts, changeFilteredProducts, getQuantityOfProducts }
