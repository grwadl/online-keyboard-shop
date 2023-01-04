import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import {
  closeBurgerMenu,
  closeFilters,
  closeModal,
  openFilters,
  openModal,
  toggleBurgerMenu
} from '../actions/modal-actions'

const initialState = {
  logInOpen: false,
  filtersOpen: false,
  burgerMenuOpen: false
}

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleBurgerMenu, (state) => {
    state.burgerMenuOpen = !state.burgerMenuOpen
  })

  builder.addCase(closeBurgerMenu, (state) => {
    state.burgerMenuOpen = false
  })

  builder.addMatcher(isAnyOf(closeModal, openModal), (state, action) => {
    const isOpen = action.payload
    state.logInOpen = isOpen
  })

  builder.addMatcher(isAnyOf(closeFilters, openFilters), (state, action) => {
    const isOpenFilters = action.payload
    state.filtersOpen = isOpenFilters
  })
})

export { modalReducer }
