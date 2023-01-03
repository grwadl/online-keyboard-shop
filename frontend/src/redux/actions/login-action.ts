import { removeFromStorage } from '@/service/localstorage/storage'
import { createAction, createAsyncThunk, PrepareAction } from '@reduxjs/toolkit'
import { Actions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { IUser, LoginData } from '../types/reducers/login'
import { IProduct } from '../types/reducers/products'

type ActionReturn = { user: IUser | null }

const login = createAsyncThunk<ActionReturn, LoginData, AsyncThunkConfig>(
  Actions.LOGIN,
  async (data, { extra: { LoginService } }) => {
    const user = await LoginService.login(data)
    return { user }
  }
)

const logOut = createAction(Actions.LOG_OUT, () => {
  removeFromStorage('token')
  return { payload: null }
})

const relogin = createAsyncThunk<ActionReturn, void, AsyncThunkConfig>(
  Actions.RELOGIN,
  async (_, { extra: { LoginService }, rejectWithValue }) => {
    const token = localStorage.getItem('token') as string
    if (!token) rejectWithValue(null)
    const user = await LoginService.validateToken(token)

    return { user }
  }
)

const register = createAsyncThunk<ActionReturn, LoginData, AsyncThunkConfig>(
  Actions.REGISTER,
  async (data, { extra: { LoginService } }) => {
    const user = await LoginService.register(data)
    return { user }
  }
)

const addProductToCart = createAsyncThunk<{ product: IProduct }, number, AsyncThunkConfig>(
  Actions.ADD_TO_CART,
  async (id, { extra: { ProductService } }) => {
    const product = await ProductService.addToCart(id)
    return { product }
  }
)

const removeError = createAction<PrepareAction<null>>(Actions.REMOVE_ERROR, () => ({ payload: null }))

export { login, relogin, removeError, register, logOut, addProductToCart }
