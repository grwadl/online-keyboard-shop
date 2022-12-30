import { createAction, PrepareAction } from '@reduxjs/toolkit'
import { ChangeEvent } from 'react'
import { FiltersAction } from '../enums/actions'
import { ChangeFilterReturn, FilterSection } from '../types/reducers/filter-reducer'

const changeFilters = createAction<PrepareAction<ChangeFilterReturn | null>>(
  FiltersAction.SELECT_CHANGED,
  (e: ChangeEvent<HTMLInputElement>, filters: FilterSection) => {
    const toChangeNameOfSection = (Object.keys(filters) as (keyof FilterSection)[]).find((key) =>
      filters[key]?.options?.some((op) => op.name === e.target.name)
    )
    if (!toChangeNameOfSection) return { payload: null }
    const toChangeEl = filters[toChangeNameOfSection]
    const changedOptionsInSection = toChangeEl.options.map((op) =>
      op.name === e.target.name ? { ...op, checked: !op.checked } : op
    )

    const payload: ChangeFilterReturn = {
      changedOptionsInSection,
      toChangeNameOfSection
    }

    return { payload }
  }
)

export { changeFilters }
