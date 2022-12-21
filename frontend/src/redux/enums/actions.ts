const Actions = {
  LOGIN: 'login',
  RELOGIN: 'relogin'
}

const ProductsActions = {
  GET_ALL: 'getAll',
  CHANGE_FILTERS: 'changeFilters'
}

const FiltersAction = {
  SELECT_CHANGED: 'selectChanged'
}

const SearchAction = {
  CHANGE_SEARCH: 'changeSearch'
}

const QueryAction = {
  CHANGE_FILTERS: 'changeFiltersQuery',
  CHANGE_SEARCH: 'changeSearchQuery',
  CHANGE_SORT: 'changeSortQuery'
}

export { Actions, ProductsActions, FiltersAction, SearchAction, QueryAction }
