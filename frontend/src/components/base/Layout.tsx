import { useDetectWindowSize } from '@/hooks/useDetectWindowSize'
import { closeModal } from '@/redux/actions/modal-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { Outlet } from 'react-router-dom'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { Loader } from './loading/Loader'
import SignModal from './sign-modal/SignModal'

const Layout = () => {
  const { user, loading } = useAppSelector(({ login }) => login)
  const isOpenModal = useAppSelector(({ modal }) => modal.logInOpen)
  const dispatch = useAppDispatch()
  const closeModalHandler = () => dispatch(closeModal())
  useDetectWindowSize()

  return (
    <div className="layout flex flex-col h-full">
      <Header user={user} />
      <SignModal
        classNameContainer="flex justify-center items-center"
        className="fixed bg-white z-10 p-10"
        closeModal={closeModalHandler}
        isOpen={isOpenModal}
      />
      <div className="padded-section mt-[60px] md:mt-36 flex-1 basis-full">{loading ? <Loader /> : <Outlet />}</div>
      <Footer />
    </div>
  )
}

export { Layout }
