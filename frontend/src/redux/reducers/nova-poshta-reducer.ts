import { mapNovaPoshtaArrayResponse } from '@/utils/mapper'
import { createReducer } from '@reduxjs/toolkit'
import { changeActiveField, changeNovaPoshtaHint, clearActiveField } from '../actions/nova-poshta-actions'
import { city, City, postOffice, PostOffice } from '../types/reducers/nova-poshta-reducer'

type InitialState = {
  activeField: 'city' | 'post' | null
  post: PostOffice[]
  city: City[]
}

const initialState: InitialState = {
  activeField: null,
  post: [],
  city: []
}

const novaPoshtaReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeActiveField, (state, action) => {
    const nameOfActiveField = action.payload
    state.activeField = nameOfActiveField
  })

  builder.addCase(clearActiveField, (state) => {
    state.activeField = null
    state.post = []
    state.city = []
  })

  builder.addCase(changeNovaPoshtaHint.fulfilled, (state, action) => {
    const { data, fieldName } = action.payload
    if (fieldName === 'city') state.city = mapNovaPoshtaArrayResponse(data, city) as City[]
    else if (fieldName === 'post') state.post = mapNovaPoshtaArrayResponse(data, postOffice) as PostOffice[]
  })
})

export { novaPoshtaReducer }
