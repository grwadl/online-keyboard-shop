import { createReducer } from '@reduxjs/toolkit'
import { login } from '../actions/login'

const initialState = {
  token: null,
  user: null,
  isLoading: true
}

const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.user = action.payload.user
  })
})

export { loginReducer }
