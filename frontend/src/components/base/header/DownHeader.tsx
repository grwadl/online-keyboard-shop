import logo from '@/assets/icons/logo.png'
import { SearchBar } from '@/components/UI/SearchBar'
import { IUser } from '@/redux/types/reducers/login'
import { useState } from 'react'
import { CartLink } from './CartLink'

type Props = {
  user: IUser | null
}

const DownHeader = ({ user }: Props) => {
  const [value, setValue] = useState('')
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)
  return (
    <div className="padded-section py-[4px] flex justify-between text-header-gray">
      <div className="logo-wrap flex gap-3 items-center">
        <img src={logo} alt="LOGO" className="logo-image w-6 h-6" />
        <span className="logo-name text-lg tracking-wide">KEYBOARD SHOP</span>
      </div>
      <SearchBar className="h-[90%]" onChange={onChangeSearch} value={value} />
      <CartLink isShowed={!!!user?.email} />
    </div>
  )
}

export { DownHeader }
