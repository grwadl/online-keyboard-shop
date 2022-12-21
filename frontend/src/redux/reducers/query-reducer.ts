import { createReducer } from '@reduxjs/toolkit'
import { changeFilterAction, changeSearchAction } from '../actions/query-action'
import { InititalStateQueery } from '../types/reducers/query-reducer'

const initialState: InititalStateQueery = {
  filters: '',
  pagination: '',
  search: '',
  sort: ''
}

const queryReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeFilterAction, (state, action) => {
    const { payload } = action

    state.filters = payload
  })

  builder.addCase(changeSearchAction, (state, action) => {
    const { payload } = action

    state.search = payload
  })
})

export { queryReducer }
