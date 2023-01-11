import { combineReducers } from '@reduxjs/toolkit'
import {
  filterReducer,
  loginReducer,
  modalReducer,
  novaPoshtaReducer,
  pageReducer,
  productPageReducer,
  productReducer,
  queryReducer
} from './internal'

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

export { rootReducer }
