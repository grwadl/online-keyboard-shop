import cart from '@/assets/icons/white-cart.svg'
import { IProduct } from '@/redux/types/reducers/products'
import Button from '../UI/Button'

type Props = {
  product: IProduct
  className?: string
}
const placeholder =
  'https://returntofreedom.org/store/wp-content/uploads/shop-placeholder.png'

const Product = ({ product, className }: Props) => {
  const addProductToCart = () => {
    return
  }
  return (
    <li className={`product-item p-2 ${className}`}>
      <img
        src={product?.image ?? placeholder}
        alt="product image"
        className="block object-cover h-48 w-full"
      />
      <h3 className="product-title">{product.name}</h3>
      <Button
        onClick={addProductToCart}
        className="flex mt-2 gap-1 items-center text-sm"
      >
        <img src={cart} alt="cart" className="w-4 h-4" />
        <span className="line">|</span>
        <span className="price">{product.price}</span>
      </Button>
    </li>
  )
}

export default Product
