import { IUser } from '@/redux/types/reducers/login'
import { DownHeader } from './DownHeader'

type Props = {
  user: IUser | null
  className?: string
}

const Header = ({ user, className }: Props) => {
  return (
    <header className={`header z-10 py-2 bg-def-white fixed w-full ${className}`}>
      <DownHeader user={user} />
    </header>
  )
}

export { Header }
