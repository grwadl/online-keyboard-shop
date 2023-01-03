import CommonHeading from '@/components/UI/CommonHeading'
import { useAppSelector } from '@/redux/common/hooks'
import { useMemo } from 'react'

const CartPage = () => {
  const { user } = useAppSelector(({ login }) => login)
  const addedToCartQuantity = useMemo(() => user?.cart.length, [user?.cart.length])

  return (
    <div className="cart-page">
      <CommonHeading subtitle={`${addedToCartQuantity} product(s)`} title="Cart" />
    </div>
  )
}

export { CartPage }
