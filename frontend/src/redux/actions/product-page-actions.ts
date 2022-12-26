import { ProductService } from '@/service/api/ProductService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsActions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { IProduct } from '../types/reducers/products'
import { ReturnType } from './products-action'

interface GetCurrentReturnType {
  keyboard: IProduct
}

const fetchLatestProducts = createAsyncThunk<ReturnType, void, AsyncThunkConfig>(
  ProductsActions.GET_LATEST,
  async () => {
    const query = '?limit=15'
    const keyboards = await ProductService.get(query)
    return { keyboards }
  }
)

const fetchCurrentProduct = createAsyncThunk<GetCurrentReturnType, number, AsyncThunkConfig>(
  ProductsActions.GET_CURRENT,
  async (id) => {
    const keyboard = await ProductService.getOne(+id)

    return { keyboard }
  }
)

export { fetchLatestProducts, fetchCurrentProduct }
