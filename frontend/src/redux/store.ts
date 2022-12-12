import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from './reducers/login-reducer'

const store = configureStore({
  reducer: {
    login: loginReducer
  }
})

export { store }
