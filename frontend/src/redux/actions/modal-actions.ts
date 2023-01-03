import { createAction } from '@reduxjs/toolkit'
import { ModalActions } from '../enums/actions'

const closeModal = createAction(ModalActions.closeModal, () => {
  return { payload: false }
})

const openModal = createAction(ModalActions.openModal, () => {
  return { payload: true }
})

export { closeModal, openModal }
