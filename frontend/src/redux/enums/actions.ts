const Actions = {
  LOGIN: 'login',
  LOG_OUT: 'logout',
  RELOGIN: 'relogin',
  REGISTER: 'register',
  REMOVE_ERROR: 'removeError',
  ADD_TO_CART: 'addToCart',
  REMOVE_FROM_CART: 'removeFromCart',
  CHANGE_PRODUCT_QUANTITY: 'changeProductQuantity'
}

const RegisterAction = {
  REGISTER: 'register',
  REMOVE_ERROR: 'removeErrorRegister'
}

const ProductsActions = {
  GET_ALL: 'getAll',
  CHANGE_FILTERS: 'changeFilters',
  GET_LATEST: 'getLatest',
  GET_CURRENT: 'getCurrent'
}

const FiltersAction = {
  SELECT_CHANGED: 'selectChanged',
  SET_NULL: 'setNull'
}

const SearchAction = {
  CHANGE_SEARCH: 'changeSearch'
}

const QueryAction = {
  CHANGE_FILTERS: 'changeFiltersQuery',
  CHANGE_SEARCH: 'changeSearchQuery',
  CHANGE_SORT: 'changeSortQuery'
}

const PageActions = {
  RESIZE: 'resize'
}

const ModalActions = {
  openModal: 'openModal',
  closeModal: 'closeModal',
  openFilters: 'openFilters',
  closeFilters: 'closeFilters',
  toggleBurgerMenu: 'toggleBurgerMenu',
  closeBurgerMenu: 'closeBurgerMenu'
}

export { Actions, ProductsActions, FiltersAction, SearchAction, QueryAction, ModalActions, RegisterAction, PageActions }
