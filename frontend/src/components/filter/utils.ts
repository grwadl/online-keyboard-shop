import { FilterSection } from './types'

const changeFilterQuery = (selectedFilters: FilterSection) => {
  const checkedLists = (Object.keys(selectedFilters) as (keyof FilterSection)[])
    .map((key) => {
      const checkedOptionsValues = selectedFilters[key]?.options?.filter((op) => op.checked)?.map(({ value }) => value)
      if (!checkedOptionsValues.length) return
      return `${key}=${checkedOptionsValues.join(',')}`
    })
    .filter((op) => !!op)

  return checkedLists.length ? `${checkedLists.join('&')}` : ''
}

export { changeFilterQuery }
