import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { changeFilteredProducts, getAllProducts } from '../actions/products-action'
import { IProduct } from '../types/reducers/products'

interface InitialState {
  keyboards: IProduct[]
  loading: boolean
}

const InitialState: InitialState = { keyboards: [], loading: true }

const productReducer = createReducer<InitialState>(InitialState, (builder) => {
  builder.addMatcher(isAnyOf(getAllProducts.fulfilled, changeFilteredProducts.fulfilled), (state) => {
    state.loading = true
  })
  builder.addMatcher(isAnyOf(getAllProducts.fulfilled, changeFilteredProducts.fulfilled), (state, action) => {
    const {
      payload: { keyboards }
    } = action
    state.keyboards = keyboards
    state.loading = false
  })

  builder.addMatcher(isAnyOf(getAllProducts.fulfilled, changeFilteredProducts.fulfilled), (state) => {
    state.loading = false
  })
})

export { productReducer }
