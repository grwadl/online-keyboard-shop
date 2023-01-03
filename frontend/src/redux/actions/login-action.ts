import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from '@/components/cart-page/CartList'
import { removeFromStorage } from '@/service/localstorage/storage'
import { createAction, createAsyncThunk, PrepareAction } from '@reduxjs/toolkit'
import { Actions } from '../enums/actions'
import { AsyncThunkConfig } from '../types/global.types'
import { ICart, IUser, LoginData } from '../types/reducers/login'

type ActionReturn = { user: IUser | null }

type ChangeCartParams = { quantity: number; id: number }

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

const addProductToCart = createAsyncThunk<{ cart: ICart }, number, AsyncThunkConfig>(
  Actions.ADD_TO_CART,
  async (id, { extra: { ProductService } }) => {
    const cart = await ProductService.addToCart(id)
    return { cart }
  }
)

const removeProductFromCart = createAsyncThunk<{ cart: ICart }, number, AsyncThunkConfig>(
  Actions.REMOVE_FROM_CART,
  async (id, { extra: { ProductService }, getState }) => {
    const {
      login: { user }
    } = getState()
    if (!user) throw new Error('user cannot be null')
    const { cart } = user
    const cartToDelete = cart.find((c) => c.product.id === id)
    if (!cartToDelete) throw new Error('cannot find the keyboard')
    await ProductService.removeFromCart(cartToDelete.id)
    return { cart: cartToDelete }
  }
)

const changeProductQuantity = createAsyncThunk<{ cart: ICart }, ChangeCartParams, AsyncThunkConfig>(
  Actions.CHANGE_PRODUCT_QUANTITY,
  async ({ id, quantity }, { extra: { ProductService } }) => {
    if (quantity < MIN_PRODUCT_QUANTITY || quantity > MAX_PRODUCT_QUANTITY) throw new Error('quantity must be normal')
    const cart = await ProductService.changeCart(id, quantity)
    return { cart }
  }
)

const changeProductQuantityLocally = createAction<PrepareAction<ChangeCartParams>>(
  Actions.CHANGE_PRODUCT_QUANTITY,
  (payload: ChangeCartParams) => ({
    payload
  })
)

const removeError = createAction<PrepareAction<null>>(Actions.REMOVE_ERROR, () => ({ payload: null }))

export {
  login,
  relogin,
  removeError,
  register,
  logOut,
  addProductToCart,
  removeProductFromCart,
  changeProductQuantity,
  changeProductQuantityLocally
}
