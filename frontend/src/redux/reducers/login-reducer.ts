import { createReducer } from '@reduxjs/toolkit'
import { ILogin } from '../types/reducers/login'

const initialState: ILogin = {
  user: null
}

const loginReducer = createReducer(initialState, (builder) => {
  return
})

export { loginReducer }
