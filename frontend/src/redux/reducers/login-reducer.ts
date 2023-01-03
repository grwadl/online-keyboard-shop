import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import {
  addProductToCart,
  changeProductQuantity,
  changeProductQuantityLocally,
  login,
  logOut,
  relogin,
  removeError,
  removeProductFromCart
} from '../actions/login-action'
import { ILogin } from '../types/reducers/login'

const initialState: ILogin = {
  user: null,
  error: null,
  loading: true
}

const loginReducer = createReducer<ILogin>(initialState, (builder) => {
  builder.addCase(login.rejected, (state) => {
    state.error = 'Invalid credentials'
  })

  builder.addCase(logOut, (state) => {
    state.user = null
  })

  builder.addCase(addProductToCart.fulfilled, (state, action) => {
    const { cart } = action.payload
    if (state.user) state.user.cart = [...state.user?.cart, cart]
  })

  builder.addCase(relogin.rejected, (state) => {
    state.loading = false
  })

  builder.addCase(changeProductQuantity.fulfilled, (state, action) => {
    if (!state.user) return
    const { cart } = action.payload
    if (cart.quantity <= 0) return
    const indexOfPrevious = state.user.cart.findIndex((it) => it.id === cart.id)
    state.user.cart.splice(indexOfPrevious, 1, cart)
  })

  builder.addCase(changeProductQuantityLocally, (state, action) => {
    if (!state.user) return
    const { id, quantity } = action.payload
    const indexOfPrevious = state.user.cart.findIndex((it) => it.id === id)
    if (indexOfPrevious === undefined) return
    state.user.cart[indexOfPrevious].quantity = quantity
  })

  builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
    const { cart } = action.payload
    if (state.user) state.user.cart = state.user.cart.filter((it) => it.id !== cart.id)
  })

  builder.addMatcher(isAnyOf(login.pending, removeError), (state) => {
    state.error = null
  })

  builder.addMatcher(isAnyOf(relogin.fulfilled, login.fulfilled), (state, action) => {
    const {
      payload: { user }
    } = action

    state.loading = false
    state.user = user
  })
})

export { loginReducer }
