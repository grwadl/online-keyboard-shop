import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { addProductToCart, login, logOut, relogin, removeError, removeProductFromCart } from '../actions/login-action'
import { ILogin } from '../types/reducers/login'

const initialState: ILogin = {
  user: null,
  error: null
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

    state.user = user
  })
})

export { loginReducer }
