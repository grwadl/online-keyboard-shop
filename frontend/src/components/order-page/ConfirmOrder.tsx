import { useAppSelector } from '@/redux/common/hooks'
import { countTotalPrice } from '@/utils/totalPrice'
import { Link } from 'react-router-dom'
import { DELIVERY_PRICE } from '../cart-page/payment/TotalPayment'
import Button from '../UI/Button'

type Props = {
  className?: string
}

const ConfirmOrder = ({ className }: Props) => {
  const { user } = useAppSelector(({ login }) => login)
  const totalPrice = countTotalPrice(user)

  return (
    <div className={`confirm-form  ${className ?? ''}`}>
      <h4 className="text-2xl font-bold mb-5">About the order</h4>
      <div className="order-more-info">
        <div className="total-payment-numbers flex justify-between">
          <span className="total-products-count text-icon-color">Products ({user?.cart.length})</span>
          <span className="total-products-price text-black">{totalPrice}$</span>
        </div>
        <div className="total-delivery-numbers mt-2 flex justify-between">
          <span className="total-delivery-text text-icon-color">Delivery price</span>
          <span className="total-delivery-price">{DELIVERY_PRICE}$</span>
        </div>
        <div className="final-price flex mt-5 justify-between">
          <div className="final-price-text text-icon-color">Total:</div>
          <div className="final-price-number font-bold text-2xl">{totalPrice + DELIVERY_PRICE}$</div>
        </div>
      </div>
      <div className="final-buttons  flex justify-between mt-8 items-center">
        <Button form="order-form" type="submit" className="px-7">
          Confirm order
        </Button>
        <Link className="hover:text-icon-color duration-300" to="/cart">
          Go back to cart
        </Link>
      </div>
    </div>
  )
}

export { ConfirmOrder }
