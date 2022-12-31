const Actions = {
  LOGIN: 'login',
  RELOGIN: 'relogin'
}

const ProductsActions = {
  GET_ALL: 'getAll',
  CHANGE_FILTERS: 'changeFilters',
  GET_LATEST: 'getLatest',
  GET_CURRENT: 'getCurrent'
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

const ModalActions = {
  openModal: 'openModal',
  closeModal: 'closeModal'
}

export { Actions, ProductsActions, FiltersAction, SearchAction, QueryAction, ModalActions }
