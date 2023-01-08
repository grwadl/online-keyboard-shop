import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { changeFilteredProducts, getAllProducts } from '../actions/products-action'
import { IProduct } from '../types/reducers/products'

interface InitialState {
  keyboards: IProduct[]
  loading: boolean
  totalProducts: number
}

const InitialState: InitialState = { keyboards: [], totalProducts: 0, loading: true }

const productReducer = createReducer<InitialState>(InitialState, (builder) => {
  builder.addMatcher(isAnyOf(getAllProducts.pending, changeFilteredProducts.pending), (state) => {
    state.loading = true
  })

  builder.addMatcher(isAnyOf(getAllProducts.fulfilled, changeFilteredProducts.fulfilled), (state, action) => {
    const {
      payload: { keyboards, totalProducts }
    } = action
    state.keyboards = keyboards
    state.loading = false
    state.totalProducts = totalProducts
  })

  builder.addMatcher(isAnyOf(getAllProducts.fulfilled, changeFilteredProducts.fulfilled), (state) => {
    state.loading = false
  })
})

export { productReducer }
