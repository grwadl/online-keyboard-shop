import cart from '@/assets/icons/white-cart.svg'
import placeholder from '@/assets/shop-placeholder.png'
import { IProduct } from '@/redux/types/reducers/products'
import { Link } from 'react-router-dom'
import Button from '../UI/Button'
import { LazyLoad } from '../UI/lazy-load/LazyLoad'
import './product.scss'

type Props = {
  product: IProduct
  className?: string
}

const Product = ({ product, className }: Props) => {
  return (
    <Link to={'/product/' + product.id} className={`product-item bg-white sm:px-2 py-2 ${className}`}>
      <LazyLoad
        alt="product image"
        placeholder={placeholder}
        src={product?.image ?? placeholder}
        className="block object-cover h-48 w-full"
      />
      <h3 className="product-title block ">{product.name}</h3>

      <Button className="flex mt-2 gap-1 items-center text-sm">
        <img src={cart} alt="cart" className="w-4 h-4" />
        <span className="line">|</span>
        <span className="price">{product.price}</span>
      </Button>
    </Link>
  )
}

export default Product
