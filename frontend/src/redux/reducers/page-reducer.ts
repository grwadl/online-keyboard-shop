import { createReducer } from '@reduxjs/toolkit'
import { changeWindowSize } from '../actions/page-action'

const initialState = {
  isOnPc: false
}

const pageReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeWindowSize, (state, action) => {
    state.isOnPc = action.payload
  })
})

export { pageReducer }
