import { createAction } from '@reduxjs/toolkit'
import { ModalActions } from '../enums/actions'

const closeModal = createAction(ModalActions.closeModal, () => ({ payload: false }))

const openModal = createAction(ModalActions.openModal, () => ({ payload: true }))

const openFilters = createAction(ModalActions.openFilters, () => ({ payload: true }))

const closeFilters = createAction(ModalActions.closeFilters, () => ({ payload: false }))

export { closeModal, openModal, openFilters, closeFilters }
