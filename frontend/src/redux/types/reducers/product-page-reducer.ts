import { fetchCurrentProduct, fetchLatestProducts } from '@/redux/actions/product-page-actions'
import { createReducer, isAllOf } from '@reduxjs/toolkit'
import { IProduct } from './products'

interface InitialState {
  product: IProduct | null
  latestProducts: IProduct[]
  isLoading: boolean
}

const initialState: InitialState = {
  latestProducts: [],
  product: null,
  isLoading: true
}

const productPageReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchLatestProducts.fulfilled, (state, action) => {
    const {
      payload: { keyboards }
    } = action
    state.latestProducts = keyboards
  })

  builder.addCase(fetchCurrentProduct.fulfilled, (state, action) => {
    const {
      payload: { keyboard }
    } = action

    state.product = keyboard
  })

  builder.addMatcher(isAllOf(fetchCurrentProduct.fulfilled, fetchCurrentProduct.fulfilled), (state) => {
    state.isLoading = false
  })
})

export { productPageReducer }
