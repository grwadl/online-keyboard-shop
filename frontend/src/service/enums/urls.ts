const baseUrl = import.meta.env.VITE_BACKEND_URL

const URL = {
  PRODUCTS: `${baseUrl}/products/`,
  USER: `${baseUrl}/user/`,
  CART: `${baseUrl}/cart/`
}

export { URL }
