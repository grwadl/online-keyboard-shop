import Button from '@/components/UI/Button'
import { logOut } from '@/redux/actions/login-action'
import { openModal } from '@/redux/actions/modal-actions'
import { useAppDispatch } from '@/redux/common/hooks'
import { IUser } from '@/redux/types/reducers/login'
import { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CartLink } from '../CartLink'
import './mobile-list.scss'

type Props = {
  burgerMenuOpen: boolean
  user: IUser | null
  closeBurgerMenu: () => void
}

const MobileList = ({ burgerMenuOpen, closeBurgerMenu, user }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const onLogOut = () => {
    dispatch(logOut())
    closeBurgerMenu()
  }

  const onLogIn = () => {
    closeBurgerMenu()
    dispatch(openModal())
  }

  useEffect(() => {
    return () => {
      closeBurgerMenu()
    }
  }, [])

  return (
    <CSSTransition nodeRef={ref} unmountOnExit in={burgerMenuOpen} timeout={200} classNames="mobile-menu">
      <div className="mobile-list py-10 z-10 padded-section fixed bg-white w-full h-full" ref={ref}>
        <CartLink onClick={closeBurgerMenu} className="flex mx-auto" user={user} />
        {!!user ? (
          <Button onClick={onLogOut} className="w-20 p-2 block mt-5 mx-auto">
            Log out
          </Button>
        ) : (
          <Button onClick={onLogIn} className="w-20 p-2 block mt-5 mx-auto">
            Log in
          </Button>
        )}
      </div>
    </CSSTransition>
  )
}

export { MobileList }
