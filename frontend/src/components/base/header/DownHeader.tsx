import logo from '@/assets/icons/logo.png'
import { SearchBar } from '@/components/UI/SearchBar'
import { useDebounce } from '@/hooks/useDebounce'
import { changeSearchAction } from '@/redux/actions/query-action'
import { useAppDispatch } from '@/redux/common/hooks'
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

  const [value, setValue] = useState('')
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  useDebounce(() => dispatch(changeSearchAction(value)), value, 300)
  return (
    <div className="padded-section py-[4px] flex justify-between text-header-gray">
      <Link to="/" className="logo-wrap flex gap-3 items-center">
        <img src={logo} alt="LOGO" className="logo-image w-6 h-6" />
        <span className="logo-name text-lg tracking-wide">KEYBOARD SHOP</span>
      </Link>
      {(pathname === '/' || pathname === '') && (
        <SearchBar className="h-[90%]" onChange={onChangeSearch} value={value} />
      )}
      <CartLink user={user} />
    </div>
  )
}

export { DownHeader }
