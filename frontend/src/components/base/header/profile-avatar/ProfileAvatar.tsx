import { IUser } from '@/redux/types/reducers/login'
import { Link } from 'react-router-dom'
import './profile-avatar.scss'

type Props = {
  user: IUser | null
  logOut: () => void
  logIn: () => void
}

const ProfileAvatar = ({ user, logIn }: Props) => {
  if (!user) return <></>

  return (
    <div className="default-avatar-wrap relative cursor-pointer">
      <Link
        to="/profile"
        className="avatar rounded-full w-6 h-6 flex items-center justify-center bg-header-gray text-white"
      >
        {user.email.charAt(0)}
      </Link>
    </div>
  )
}

export { ProfileAvatar }
