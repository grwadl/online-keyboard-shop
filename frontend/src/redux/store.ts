import { LoginService } from '@/service/api/LoginService'
import { ProductService } from '@/service/api/ProductService'
import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from './reducers/filters-reducer'
import { loginReducer } from './reducers/login-reducer'
import { modalReducer } from './reducers/modal-reducer'
import { pageReducer } from './reducers/page-reducer'
import { productReducer } from './reducers/products-reducer'
import { queryReducer } from './reducers/query-reducer'
import { registerReducer } from './reducers/register-reducer'
import { productPageReducer } from './types/reducers/product-page-reducer'

const extraArgument = {
  LoginService,
  ProductService
}

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    products: productReducer,
    filters: filterReducer,
    query: queryReducer,
    productPage: productPageReducer,
    modal: modalReducer,
    page: pageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument
      }
    })
})

export { store, extraArgument }
