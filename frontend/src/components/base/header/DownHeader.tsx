import logo from '@/assets/icons/logo.png'
import { BurgerMenu } from '@/components/UI/burger-menu/BurgerMenu'
import { MyInput } from '@/components/UI/MyInput'
import { useDebounce } from '@/hooks/useDebounce'
import { toggleBurgerMenu } from '@/redux/actions/modal-actions'
import { changeSearchAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { IUser } from '@/redux/types/reducers/login'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartLink } from './CartLink'

type Props = {
  user: IUser | null
}

const DownHeader = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const { burgerMenuOpen } = useAppSelector(({ modal }) => modal)

  const [value, setValue] = useState('')
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const openBurgerMenuHandler = () => dispatch(toggleBurgerMenu())

  useDebounce(() => dispatch(changeSearchAction(value)), value, 300)

  return (
    <div className="padded-section relative z-30 py-[4px] flex justify-between items-center text-header-gray">
      <Link to="/" className="logo-wrap flex gap-3 items-center">
        <img src={logo} alt="LOGO" className="logo-image w-6 h-6" />
      </Link>
      {(pathname === '/' || pathname === '') && (
        <MyInput
          otherProps={{ placeholder: 'Type the name of the keyboard...' }}
          className="hidden md:block h-[90%]"
          onChange={onChangeSearch}
          value={value}
        />
      )}
      <CartLink className="hidden md:flex" user={user} />
      <BurgerMenu
        isOpen={burgerMenuOpen}
        onClick={openBurgerMenuHandler}
        className="w-8 block md:hidden h-5"
        color="bg-black"
      />
    </div>
  )
}

export { DownHeader }
