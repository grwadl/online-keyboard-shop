import { LoginService } from '@/service/api/LoginService'
import { ProductService } from '@/service/api/ProductService'
import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from './reducers/login-reducer'

const extraArgument = {
  LoginService,
  ProductService
}

const store = configureStore({
  reducer: {
    login: loginReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument
      }
    })
})

export { store, extraArgument }
