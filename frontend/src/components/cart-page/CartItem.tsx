import { useDebounce } from '@/hooks/useDebounce'
import { changeProductQuantity } from '@/redux/actions/login-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { ICart } from '@/redux/types/reducers/login'
import { useEffect, useState } from 'react'
import { CloseButton } from '../UI/CloseButton'
import './cart-item.scss'
import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from './CartList'

type Props = {
  cart: ICart
  onChangeQuantity: (cart: ICart, quan: number) => void
  onPlusQuantity: (cart: ICart) => void
  onMinusQuantity: (cart: ICart) => void
  removeFromCart: (cart: ICart) => void
}

const CartItem = ({ cart, onChangeQuantity, onMinusQuantity, onPlusQuantity, removeFromCart }: Props) => {
  const dispatch = useAppDispatch()
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  useDebounce(
    () => {
      if (isFirstRender) return
      dispatch(changeProductQuantity({ id: cart.id, quantity: cart.quantity }))
    },
    cart.quantity,
    300
  )

  return (
    <div className="cart-item flex relative w-full gap-5 justify-between items-center p-2 cursor-pointer">
      <div className="cart-product-general-info basis-[460px] flex gap-3 items-center">
        <div className="cart-item-img-wrap w-32 h-24 flex justify-center">
          <img src={cart.product.image} className="h-full object-contain" alt="product image" />
        </div>
        <div className="cart-product-name max-w -xs overflow-hidden">{cart.product.name}</div>
      </div>
      <div className="cart-item-quantity-manage max-w-[100px] flex gap-2">
        <span className="minus-btn text-lg" onClick={() => onMinusQuantity(cart)}>
          -
        </span>
        <span className="input-quantity">
          <input
            className="outline-none max-w-[20px] text-center text-lg"
            type="number"
            value={cart.quantity}
            max={MAX_PRODUCT_QUANTITY}
            min={MIN_PRODUCT_QUANTITY}
            onChange={(e) => onChangeQuantity(cart, +e.target.value)}
          />
        </span>
        <span className="plus-btn text-lg" onClick={() => onPlusQuantity(cart)}>
          +
        </span>
      </div>
      <div className="cart-item-total-price text-lg font-bold">{cart.quantity * cart.product.price} $</div>
      <CloseButton onClick={() => removeFromCart(cart)} className="absolute bottom-2 right-2 text-xl cursor-pointer" />
    </div>
  )
}

export { CartItem }
