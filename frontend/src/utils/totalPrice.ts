import { IUser } from '@/redux/types/reducers/login'

const countTotalPrice = (user: IUser | null) => {
  if (!user?.cart?.length) return 0
  const prices = user.cart.map((prod) => prod.quantity * prod.product.price)
  return prices.reduce((total, current) => total + current)
}

export { countTotalPrice }
