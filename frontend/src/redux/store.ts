import { LoginService, PostService, ProductService } from '@/service/api/internal'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  filterReducer,
  loginReducer,
  modalReducer,
  novaPoshtaReducer,
  pageReducer,
  productPageReducer,
  productReducer,
  queryReducer
} from './reducers/internal'

import { unauthMiddleware } from './middlewares/unauth'

const extraArgument = {
  LoginService,
  ProductService,
  PostService
}

const rootReducer = combineReducers({
  login: loginReducer,
  products: productReducer,
  filters: filterReducer,
  query: queryReducer,
  productPage: productPageReducer,
  modal: modalReducer,
  page: pageReducer,
  post: novaPoshtaReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument
      }
    }).concat(unauthMiddleware)
})

type Store = typeof store
type RootState = ReturnType<typeof rootReducer>

type AppDispatch = typeof store.dispatch

type AsyncThunkConfig = {
  state: RootState
  dispatch: AppDispatch
  extra: typeof extraArgument
}

export type { RootState, AppDispatch, AsyncThunkConfig, Store }
export { extraArgument }
