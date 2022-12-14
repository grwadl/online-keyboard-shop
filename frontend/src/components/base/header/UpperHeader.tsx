import clock from '@/assets/icons/mdi_clock-time-five-outline.svg'
import { IUser } from '@/redux/types/reducers/login'
import { useState } from 'react'

type Props = {
  user: IUser | null
}

const UpperHeader = ({ user }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const toggleModalOpen = () => setModalOpen(true)
  const toggleModalClose = () => setModalOpen(false)

  return (
    <div className="bg-header-gray w-full py-2 flex justify-between text-my-white padded-section text-white">
      <div className="header-worktime flex gap-1">
        <img src={clock} alt="clock" />
        <span className="header-worktime-clock-numbers">10:30 - 6:00</span>
      </div>
      <div className="header-login-link" onClick={toggleModalOpen}>
        {!user?.email && <span className="header-login-btn">Login</span>}
      </div>
      <div className={`login-form ${isModalOpen ? '' : 'hidden'}`}></div>
    </div>
  )
}

export { UpperHeader }
