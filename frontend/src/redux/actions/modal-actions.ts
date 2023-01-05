import { createAction } from '@reduxjs/toolkit'
import { ModalActions } from '../enums/actions'

const closeModal = createAction(ModalActions.CLOSE_MODAL, () => ({ payload: false }))

const openModal = createAction(ModalActions.OPEN_MODAL, () => ({ payload: true }))

const openFilters = createAction(ModalActions.OPEN_FILTERS, () => ({ payload: true }))

const closeFilters = createAction(ModalActions.CLOSE_FILTERS, () => ({ payload: false }))

const toggleBurgerMenu = createAction(ModalActions.TOGGLE_BURGER_MENU, () => ({ payload: null }))

const closeBurgerMenu = createAction(ModalActions.CLOSE_BURGER_MENU, () => ({ payload: false }))

export { closeModal, openModal, openFilters, closeFilters, toggleBurgerMenu, closeBurgerMenu }
