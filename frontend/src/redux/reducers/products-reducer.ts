import { createReducer } from '@reduxjs/toolkit'
import { getAllProducts } from '../actions/products-action'
import { IProduct } from '../types/reducers/products'

interface InitialState {
  keyboards: IProduct[]
}

const InitialState: InitialState = { keyboards: [] }

const productReducer = createReducer<InitialState>(InitialState, (builder) => {
  builder.addCase(getAllProducts.fulfilled, (state, action) => {
    const {
      payload: { keyboards }
    } = action
    console.log(keyboards)
    state.keyboards = keyboards
  })
})

export { productReducer }
