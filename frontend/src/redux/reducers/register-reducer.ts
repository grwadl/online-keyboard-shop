import { createReducer } from '@reduxjs/toolkit'
import { register } from '../actions/login-action'
import { IRegisterReducer } from '../types/reducers/register-reducer'

const initialValue: IRegisterReducer = {
  error: '',
  isSuccess: false
}

const registerReducer = createReducer(initialValue, (builder) => {
  builder.addCase(register.fulfilled, (state) => {
    state.isSuccess = true
  })

  builder.addCase(register.rejected, (state, action) => {
    state.isSuccess = false
    const { message } = action.error
    if (message) state.error = message
  })

  builder.addCase(register.pending, (state) => {
    state.error = ''
    state.isSuccess = null
  })
})

export { registerReducer }
