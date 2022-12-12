import { IUser } from '@/redux/types/reducers/login'
import { DownHeader } from './DownHeader'
import { UpperHeader } from './UpperHeader'

type Props = {
  user: IUser | null
}

const Header = ({ user }: Props) => {
  return (
    <header className="header">
      <UpperHeader user={user} />
      <DownHeader user={user} />
    </header>
  )
}

export { Header }
