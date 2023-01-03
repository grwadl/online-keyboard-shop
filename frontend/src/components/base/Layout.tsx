import { closeModal } from '@/redux/actions/modal-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { Outlet } from 'react-router-dom'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import SignModal from './sign-modal/SignModal'

const Layout = () => {
  const user = useAppSelector(({ login }) => login)
  const isOpenModal = useAppSelector(({ modal }) => modal.logInOpen)
  const dispatch = useAppDispatch()
  const closeModalHandler = () => dispatch(closeModal())

  return (
    <div className="layout flex flex-col h-full">
      <Header user={user.user} />
      <SignModal
        className="fixed top-[25%] bg-white z-10 left-[40%] p-10"
        closeModal={closeModalHandler}
        isOpen={isOpenModal}
      />
      <div className="padded-section mt-36 flex-1 basis-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export { Layout }
