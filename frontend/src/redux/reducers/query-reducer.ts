import { createReducer } from '@reduxjs/toolkit'
import { changeFilterAction, changeSearchAction, changeSortAction } from '../actions/query-action'
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

  builder.addCase(changeSortAction, (state, action) => {
    const { payload } = action

    state.sort = payload
  })
})

export { queryReducer }
