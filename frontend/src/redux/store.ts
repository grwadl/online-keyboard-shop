import { LoginService, PostService, ProductService } from '@/service/api/internal'
import { configureStore } from '@reduxjs/toolkit'

import { unauthMiddleware } from './middlewares/unauth'
import { rootReducer } from './reducers/root-reducer'

const extraArgument = {
  LoginService,
  ProductService,
  PostService
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument
      }
    }).concat(unauthMiddleware)
})

export { extraArgument }
