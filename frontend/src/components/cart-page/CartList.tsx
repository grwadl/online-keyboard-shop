import { changeProductQuantityLocally, removeProductFromCart } from '@/redux/actions/login-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { ICart } from '@/redux/types/reducers/login'
import { useCallback } from 'react'
import { CartItem } from './CartItem'

type Props = {
  cart: ICart[]
  className?: string
}

const MAX_PRODUCT_QUANTITY = 10
const MIN_PRODUCT_QUANTITY = 1

const CartList = ({ cart, className }: Props) => {
  const dispatch = useAppDispatch()
  const onChangeQuantity = useCallback((cart: ICart, quantity: number) => {
    if (quantity > MAX_PRODUCT_QUANTITY || quantity < 0) return
    dispatch(changeProductQuantityLocally({ quantity, id: cart.id }))
  }, [])

  const removeFromCart = useCallback(({ product }: ICart) => dispatch(removeProductFromCart(product.id)), [])

  const onPlusQuantity = useCallback((cart: ICart) => {
    if (cart.quantity === MAX_PRODUCT_QUANTITY) return
    dispatch(changeProductQuantityLocally({ quantity: cart.quantity + 1, id: cart.id }))
  }, [])
  const onMinusQuantity = useCallback((cart: ICart) => {
    if (cart.quantity === MIN_PRODUCT_QUANTITY) return
    dispatch(changeProductQuantityLocally({ quantity: cart.quantity - 1, id: cart.id }))
  }, [])

  return (
    <div className={className ?? ''}>
      {cart?.map((item) => (
        <CartItem
          key={item.id}
          removeFromCart={removeFromCart}
          onMinusQuantity={onMinusQuantity}
          onPlusQuantity={onPlusQuantity}
          onChangeQuantity={onChangeQuantity}
          cart={item}
        />
      ))}
    </div>
  )
}

export { CartList, MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY }
