import { CartList } from '@/components/cart-page/CartList'
import Button from '@/components/UI/Button'
import CommonHeading from '@/components/UI/CommonHeading'
import { useAppSelector } from '@/redux/common/hooks'
import { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const { user } = useAppSelector(({ login }) => login)
  const addedToCartQuantity = useMemo(() => user?.cart.length, [user?.cart.length])
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.email) navigate('/', { replace: true })
  }, [])

  if (!addedToCartQuantity)
    return (
      <div className="cart-page w-full h-full flex justify-center items-center">
        <div className="not-found-image w-52 h-52">
          <img className="w-full" src="" alt="not found" />
        </div>
        <h3 className="cart-not-found-title">Your cart is empty :(</h3>
        <p className="cart-not-found-para m-3"></p>
        <Link to="/">
          <Button className="p-2 mt-7">Catalog</Button>
        </Link>
      </div>
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
