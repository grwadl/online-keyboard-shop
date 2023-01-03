import cart from '@/assets/icons/cart.svg'
import { logOut as logOutAction } from '@/redux/actions/login-action'
import { openModal } from '@/redux/actions/modal-actions'
import { useAppDispatch } from '@/redux/common/hooks'
import { IUser } from '@/redux/types/reducers/login'
import { ProfileAvatar } from './profile-avatar/ProfileAvatar'

type Props = {
  user: IUser | null
}

const CartLink = ({ user }: Props) => {
  const isShowed = !!user
  const dispatch = useAppDispatch()
  const logOut = () => dispatch(logOutAction())
  const logIn = () => dispatch(openModal())

  return (
    <div className="cart-link flex gap-1 items-center">
      <ProfileAvatar logIn={logIn} logOut={logOut} user={user} />
      <img className={`w-6 ${!isShowed ? 'hidden' : ''}`} src={cart} alt="cart icon" />
      <span className={`cart-link-general-price ${!isShowed ? 'hidden' : ''}`}>{0} UAH</span>
    </div>
  )
}

export { CartLink }
