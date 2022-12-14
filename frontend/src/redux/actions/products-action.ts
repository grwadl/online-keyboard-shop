import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsActions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { IProduct } from '../types/reducers/products'

interface ReturnType {
  keyboards: IProduct[]
}

const getAllProducts = createAsyncThunk<ReturnType, void, AsyncThunkConfig>(
  ProductsActions.GET_ALL,
  async (_, { extra: { ProductService } }) => {
    const keyboards = await ProductService.get()

    return { keyboards }
  }
)

export { getAllProducts }
