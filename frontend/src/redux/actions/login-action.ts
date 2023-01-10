import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from '@/components/cart-page/CartList'
import { removeFromStorage } from '@/service/localstorage/storage'
import { PrepareAction, createAction, createAsyncThunk } from '@reduxjs/toolkit'
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

const logOut = createAsyncThunk<null, void, AsyncThunkConfig>(
  Actions.LOG_OUT,
  async (_, { extra: { LoginService } }) => {
    removeFromStorage('token')
    await LoginService.logOut()
    return null
  }
)

const relogin = createAsyncThunk<ActionReturn, void, AsyncThunkConfig>(
  Actions.RELOGIN,
  async (_, { extra: { LoginService } }) => {
    const user = await LoginService.validateToken()

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
  logOut,
  addProductToCart,
  removeProductFromCart,
  changeProductQuantity,
  changeProductQuantityLocally
}
