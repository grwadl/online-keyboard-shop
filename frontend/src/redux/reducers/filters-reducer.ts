import { createReducer } from '@reduxjs/toolkit'
import { changeFilters } from '../actions/filters-action'
import { FilterSection } from '../types/reducers/filter-reducer'

const initialState: FilterSection = {
  keycaps: {
    options: [
      { name: 'PBT', value: 'pbt', checked: false },
      { name: 'ABS', value: 'abs', checked: false }
    ]
  },
  switches: {
    options: [
      { name: 'Red', value: 'red', checked: false },
      { name: 'Blue', value: 'blue', checked: false },
      { name: 'Brown', value: 'brown', checked: false }
    ]
  },
  type: {
    options: [
      { name: 'Mechanical', value: 'mechanical', checked: false },
      { name: 'Optical', value: 'optical', checked: false }
    ]
  }
}

const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeFilters, (state, action) => {
    if (!action.payload) return
    const { toChangeNameOfSection, changedOptionsInSection } = action.payload
    state[toChangeNameOfSection] = {
      options: changedOptionsInSection
    }
  })
})

export { filterReducer }
