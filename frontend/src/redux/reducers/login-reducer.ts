import { createReducer } from '@reduxjs/toolkit'
import { relogin } from '../actions/login-action'
import { ILogin } from '../types/reducers/login'

const initialState: ILogin = {
  user: null
}

const loginReducer = createReducer<ILogin>(initialState, (builder) => {
  builder.addCase(relogin.fulfilled, (state, action) => {
    const {
      payload: { user }
    } = action

    state.user = user
  })
})

export { loginReducer }
