import cart from '@/assets/icons/cart.svg'
import { logOut as logOutAction } from '@/redux/actions/login-action'
import { openModal } from '@/redux/actions/modal-actions'
import { useAppDispatch } from '@/redux/common/hooks'
import { IUser } from '@/redux/types/reducers/login'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProfileAvatar } from './profile-avatar/ProfileAvatar'

type Props = {
  user: IUser | null
  className?: string
  onClick?: () => void
}

const CartLink = ({ user, className, onClick }: Props) => {
  const isShowed = useMemo(() => !!user, [user?.email])
  const totalPrice = useMemo<number>(() => {
    if (!user?.cart?.length) return 0
    const prices = user.cart.map((prod) => prod.quantity * prod.product.price)
    return prices.reduce((total, current) => total + current)
  }, [user?.cart])
  const dispatch = useAppDispatch()
  const logOut = () => dispatch(logOutAction())
  const logIn = () => dispatch(openModal())

  return (
    <div className={`cart-link gap-2 items-center basis-28 shrink-0 grow max-w-fit justify-end ${className ?? ''}`}>
      <ProfileAvatar logIn={logIn} logOut={logOut} user={user} />
      {isShowed && (
        <Link to="/cart" onClick={onClick}>
          <img className={`w-6 ${!isShowed ? 'hidden' : ''}`} src={cart} alt="cart icon" />
        </Link>
      )}
      <span className={`cart-link-general-price whitespace-nowrap ${!isShowed ? 'hidden' : ''}`}>
        {totalPrice ?? 0} $
      </span>
    </div>
  )
}

export { CartLink }
