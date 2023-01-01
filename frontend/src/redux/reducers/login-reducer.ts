import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { login, relogin, removeError } from '../actions/login-action'
import { ILogin } from '../types/reducers/login'

const initialState: ILogin = {
  user: null,
  error: null
}

const loginReducer = createReducer<ILogin>(initialState, (builder) => {
  builder.addCase(login.rejected, (state) => {
    state.error = 'Invalid credentials'
  })

  builder.addMatcher(isAnyOf(login.pending, removeError), (state) => {
    state.error = null
  })

  builder.addMatcher(isAnyOf(relogin.fulfilled, login.fulfilled), (state, action) => {
    const {
      payload: { user }
    } = action

    state.user = user
  })
})

export { loginReducer }
