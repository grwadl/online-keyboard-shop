import cartEmpty from '@/assets/images/empty-cart.svg'
import { CartList } from '@/components/cart-page/CartList'
import Button from '@/components/UI/Button'
import CommonHeading from '@/components/UI/CommonHeading'
import { MessageBox } from '@/components/UI/MessageBox'
import { useAppSelector } from '@/redux/common/hooks'
import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { user } = useAppSelector(({ login }) => login)
  const addedToCartQuantity = useMemo(() => user?.cart.length, [user?.cart.length])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.email) navigate('../', { replace: true })
  }, [])

  if (!addedToCartQuantity)
    return (
      <MessageBox
        className="cart-page w-full h-full flex flex-col justify-center items-center"
        imageSrc={cartEmpty}
        subtitle="Unfortunately your cart is empty... But You can go and buy something"
        title="Your cart is empty :("
      >
        <Link to="/">
          <Button className="py-2 px-3 text-lg mt-7">Catalog</Button>
        </Link>
      </MessageBox>
    )

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
