import { IUser } from '@/redux/types/reducers/login'
import { DownHeader } from './DownHeader'
import { UpperHeader } from './UpperHeader'

type Props = {
  user: IUser | null
  className?: string
}

const Header = ({ user, className }: Props) => {
  return (
    <header className={`header bg-def-white fixed w-full ${className}`}>
      <UpperHeader user={user} />
      <DownHeader user={user} />
    </header>
  )
}

export { Header }
