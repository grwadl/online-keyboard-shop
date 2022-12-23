import cart from '@/assets/icons/cart.svg'
import { IUser } from '@/redux/types/reducers/login'

type Props = {
  user: IUser | null
}

const CartLink = ({ user }: Props) => {
  const isShowed = !!!user?.email
  return (
    <div className="cart-link flex gap-1 items-center">
      <img className={`w-6 ${!isShowed ? 'hidden' : ''}`} src={cart} alt="cart icon" />
      <span className={`cart-link-general-price ${!isShowed ? 'hidden' : ''}`}>{user?.email ?? 0} UAH</span>
    </div>
  )
}

export { CartLink }
