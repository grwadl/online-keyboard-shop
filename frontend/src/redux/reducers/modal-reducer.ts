import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { closeModal, openModal } from '../actions/modal-actions'

const initialState = {
  logInOpen: false
}

const modalReducer = createReducer(initialState, (builder) => {
  builder.addMatcher(isAnyOf(closeModal, openModal), (state, action) => {
    const isOpen = action.payload
    state.logInOpen = isOpen
  })
})

export { modalReducer }
