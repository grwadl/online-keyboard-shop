import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { closeFilters, closeModal, openFilters, openModal } from '../actions/modal-actions'

const initialState = {
  logInOpen: false,
  filtersOpen: false
}

const modalReducer = createReducer(initialState, (builder) => {
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
