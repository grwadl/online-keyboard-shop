import { createReducer } from '@reduxjs/toolkit'
import {
  changeFilterAction,
  changeLimitAction,
  changePageAction,
  changePriceAction,
  changeSearchAction,
  changeSortAction
} from '../actions/query-action'
import { InititalStateQuery } from '../types/reducers/query-reducer'

const initialState: InititalStateQuery = {
  filters: '',
  page: 'page=1',
  search: '',
  sort: 'sort=-name',
  limit: 'limit=8',
  price: 'price=0gt,10000lt'
}

const queryReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeFilterAction, (state, action) => {
    const { payload } = action
    if (state.filters === payload) return
    if (state.page !== 'page=1') state.page = 'page=1'
    state.filters = payload
  })

  builder.addCase(changeSearchAction, (state, action) => {
    const { payload } = action
    if (state.search === payload) return
    if (state.page !== 'page=1') state.page = 'page=1'
    state.search = payload
  })

  builder.addCase(changeSortAction, (state, action) => {
    const { payload } = action
    if (state.sort === payload) return
    if (state.page !== 'page=1') state.page = 'page=1'

    state.sort = payload
  })

  builder.addCase(changePageAction, (state, action) => {
    const { payload } = action
    if (state.page === payload) return
    state.page = payload
  })

  builder.addCase(changeLimitAction, (state, action) => {
    const { payload } = action
    if (state.limit === payload) return
    if (state.page !== 'page=1') state.page = 'page=1'

    state.limit = payload
  })

  builder.addCase(changePriceAction, (state, action) => {
    const { payload } = action
    if (state.price === payload) return
    if (state.page !== 'page=1') state.page = 'page=1'

    state.price = payload
  })
})

export { queryReducer }
