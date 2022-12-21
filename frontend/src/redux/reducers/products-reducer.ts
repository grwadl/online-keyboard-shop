import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { changeFilteredProducts, getAllProducts } from '../actions/products-action'
import { IProduct } from '../types/reducers/products'

interface InitialState {
  keyboards: IProduct[]
}

const InitialState: InitialState = { keyboards: [] }

const productReducer = createReducer<InitialState>(InitialState, (builder) => {
  builder.addMatcher(isAnyOf(getAllProducts.fulfilled, changeFilteredProducts.fulfilled), (state, action) => {
    const {
      payload: { keyboards }
    } = action
    state.keyboards = keyboards
  })
})

export { productReducer }
