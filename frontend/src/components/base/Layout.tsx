import { useAppSelector } from '@/redux/common/hooks'
import { Outlet } from 'react-router-dom'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'

const Layout = () => {
  const user = useAppSelector(({ login }) => login)

  return (
    <div className="layout flex flex-col h-full">
      <Header user={user.user} />
      <div className="padded-section mt-36 flex-1 basis-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export { Layout }
