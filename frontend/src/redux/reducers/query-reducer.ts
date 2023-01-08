import { createReducer } from '@reduxjs/toolkit'
import {
  changeFilterAction,
  changeLimitAction,
  changePageAction,
  changeSearchAction,
  changeSortAction
} from '../actions/query-action'
import { InititalStateQuery } from '../types/reducers/query-reducer'

const initialState: InititalStateQuery = {
  filters: '',
  page: 'page=1',
  search: '',
  sort: '',
  limit: 'limit=8'
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

  builder.addCase(changePageAction, (state, action) => {
    const { payload } = action

    state.page = payload
  })

  builder.addCase(changeLimitAction, (state, action) => {
    const { payload } = action

    state.limit = payload
  })
})

export { queryReducer }
