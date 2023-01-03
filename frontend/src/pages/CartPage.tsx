import { CartList } from '@/components/cart-page/CartList'
import CommonHeading from '@/components/UI/CommonHeading'
import { useAppSelector } from '@/redux/common/hooks'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { user } = useAppSelector(({ login }) => login)
  const addedToCartQuantity = useMemo(() => user?.cart.length, [user?.cart.length])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.email) navigate('/', { replace: true })
  }, [])

  return (
    <div className="cart-page">
      <CommonHeading subtitle={`${addedToCartQuantity} product(s)`} title="Cart" />
      <div className="cart-wrapper flex flex-wrap">
        {user?.cart && <CartList className="flex-grow-0 shrink-0 basis-2/3" cart={user.cart} />}
      </div>
    </div>
  )
}

export { CartPage }
