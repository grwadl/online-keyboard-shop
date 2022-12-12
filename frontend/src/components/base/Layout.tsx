import { useAppSelector } from '@/redux/common/hooks'
import { IProduct } from '@/redux/types/reducers/products'
import { LoginService } from '@/service/api/LoginService'
import { useEffect, useState } from 'react'
import { Header } from './header/Header'

type Props = {
  children?: React.ReactElement
}

const Layout = ({ children }: Props) => {
  const user = useAppSelector(({ login }) => login)
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    LoginService.validateToken().then((res) => console.log(res))
  }, [])

  return (
    <div className="layout">
      <Header user={user.user} />
    </div>
  )
}

export { Layout }
