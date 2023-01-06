import { mapNovaPoshtaArrayResponse } from '@/utils/mapper'
import { createReducer } from '@reduxjs/toolkit'
import {
  changeActiveField,
  changeNovaPoshtaHint,
  clearActiveField,
  setSelectedValue
} from '../actions/nova-poshta-actions'
import { city, City, postOffice, PostOffice } from '../types/reducers/nova-poshta-reducer'

type InitialState = {
  activeField: 'city' | 'post' | null
  post: PostOffice[]
  city: City[]
  activeCity: City | null
  activePostOffice: PostOffice | null
}

const initialState: InitialState = {
  activeField: null,
  post: [],
  city: [],
  activeCity: null,
  activePostOffice: null
}

const novaPoshtaReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeActiveField, (state, action) => {
    const nameOfActiveField = action.payload
    state.activeField = nameOfActiveField
  })

  builder.addCase(clearActiveField, (state) => {
    state.activeField = null
  })

  builder.addCase(changeNovaPoshtaHint.fulfilled, (state, action) => {
    const { data, fieldName } = action.payload
    if (fieldName === 'city') state.city = mapNovaPoshtaArrayResponse(data, city) as City[]
    else if (fieldName === 'post') state.post = mapNovaPoshtaArrayResponse(data, postOffice) as PostOffice[]
  })

  builder.addCase(setSelectedValue, (state, action) => {
    const { fieldName, value } = action.payload

    if (fieldName === 'city') {
      const foundItem = state.city.find((it) => it.Description === value) ?? null
      state.activeCity = foundItem
    } else if (fieldName === 'post') {
      const foundItem = state.post.find((it) => it.Description === value) ?? null
      state.activePostOffice = foundItem
    }
  })
})

export { novaPoshtaReducer }
