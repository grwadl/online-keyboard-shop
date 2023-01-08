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
  GET_QUANTITY: 'getQuantity',
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
  CHANGE_SORT: 'changeSortQuery',
  CHANGE_PAGE: 'changePage',
  CHANGE_LIMIT: 'changeLimit'
}

const PageActions = {
  RESIZE: 'resize'
}

const NovaPoshtaActions = {
  CHANGE_ACTIVE: 'changeActive',
  CLEAR_ACTIVE: 'clearActive',
  CHANGE_HINT: 'changeHint',
  SET_SELECTED_VALUE: 'setSelectedValue'
}

const ModalActions = {
  OPEN_MODAL: 'openModal',
  CLOSE_MODAL: 'closeModal',
  OPEN_FILTERS: 'openFilters',
  CLOSE_FILTERS: 'closeFilters',
  TOGGLE_BURGER_MENU: 'toggleBurgerMenu',
  CLOSE_BURGER_MENU: 'closeBurgerMenu'
}

export {
  Actions,
  ProductsActions,
  FiltersAction,
  SearchAction,
  QueryAction,
  ModalActions,
  RegisterAction,
  PageActions,
  NovaPoshtaActions
}
