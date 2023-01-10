import { CartPage } from '@/pages/CartPage'
import { Homepage } from '@/pages/Homepage'
import { OrderPage } from '@/pages/OrderPage'
import { ProductPage } from '@/pages/ProductPage'
import ProfilePage from '@/pages/ProfilePage'
import { useAppSelector } from '@/redux/common/hooks'
import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../base/Layout'

const Router = () => {
  const { user } = useAppSelector(({ login }) => login)
  const isLogined = useMemo<boolean>(() => !!user, [user])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {isLogined && (
            <>
              <Route path="cart" element={<CartPage />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </>
          )}
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </>
  )
}

export { Router }
