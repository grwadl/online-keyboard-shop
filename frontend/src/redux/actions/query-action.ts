import { createAction, PrepareAction } from '@reduxjs/toolkit'
import { QueryAction } from '../enums/actions'
import { FilterSection } from '../types/reducers/filter-reducer'

const changeFilterAction = createAction<PrepareAction<string>>(
  QueryAction.CHANGE_FILTERS,
  (selectedFilters: FilterSection) => {
    const checkedLists = (Object.keys(selectedFilters) as (keyof FilterSection)[])
      .map((key) => {
        const checkedOptionsValues = selectedFilters[key]?.options
          ?.filter((op) => op.checked)
          ?.map(({ value }) => value)
        if (!checkedOptionsValues.length) return
        return `${key}=${checkedOptionsValues.join(',')}`
      })
      .filter((op) => !!op)

    return { payload: checkedLists.length ? `${checkedLists.join('&')}` : '' }
  }
)

const changeSearchAction = createAction<PrepareAction<string>>(QueryAction.CHANGE_SEARCH, (name: string) => ({
  payload: name ? `name=~${name}` : ''
}))

const changeSortAction = createAction<PrepareAction<string>>(QueryAction.CHANGE_SORT, (sort: string) => ({
  payload: sort ? `sort=${sort}` : ''
}))

export { changeFilterAction, changeSearchAction, changeSortAction }
