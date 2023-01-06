import { closeBurgerMenu } from '@/redux/actions/modal-actions'
import { useAppSelector } from '@/redux/common/hooks'
import { IUser } from '@/redux/types/reducers/login'
import { useDispatch } from 'react-redux'
import { DownHeader } from './DownHeader'
import { MobileList } from './mobile-list/MobileList'

type Props = {
  user: IUser | null
  className?: string
}

const Header = ({ user, className }: Props) => {
  const dispatch = useDispatch()
  const { isOnPc } = useAppSelector(({ page }) => page)
  const { burgerMenuOpen } = useAppSelector(({ modal }) => modal)
  const closeBurgerMenuHandler = () => dispatch(closeBurgerMenu())

  return (
    <header className={`header z-[100] py-2 border-b border-icon-color bg-def-white fixed w-full ${className}`}>
      <div className="width-wrap max-w-[1600px] mx-auto">
        <DownHeader user={user} />
        {isOnPc !== null && !isOnPc && (
          <MobileList user={user} closeBurgerMenu={closeBurgerMenuHandler} burgerMenuOpen={burgerMenuOpen} />
        )}
      </div>
    </header>
  )
}

export { Header }
