import cart from '@/assets/icons/cart.svg'

type Props = {
  isShowed: boolean
}

const CartLink = ({ isShowed }: Props) => {
  return (
    <div className="cart-link flex gap-1 items-center">
      <img className="w-6" src={cart} alt="cart icon" />
      <span className={`cart-link-general-price ${!isShowed ? 'hidden' : ''}`}>
        UAH
      </span>
    </div>
  )
}

export { CartLink }
