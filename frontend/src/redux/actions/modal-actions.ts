import { createAction } from '@reduxjs/toolkit'
import { ModalActions } from '../enums/actions'

const closeModal = createAction(ModalActions.closeModal, () => ({ payload: false }))

const openModal = createAction(ModalActions.openModal, () => ({ payload: true }))

const openFilters = createAction(ModalActions.openFilters, () => ({ payload: true }))

const closeFilters = createAction(ModalActions.closeFilters, () => ({ payload: false }))

const toggleBurgerMenu = createAction(ModalActions.toggleBurgerMenu, () => ({ payload: null }))

const closeBurgerMenu = createAction(ModalActions.closeBurgerMenu, () => ({ payload: false }))

export { closeModal, openModal, openFilters, closeFilters, toggleBurgerMenu, closeBurgerMenu }
