import { IProduct } from '@/redux/types/reducers/products'
import './product-type.scss'

type Props = {
  keyboard: IProduct
  className?: string
}

const ProductType = ({ keyboard, className }: Props) => {
  return (
    <div className={`product-type-container ${className}`}>
      <div className="product-type">
        <span className="product-type-name">Switches: </span>
        <span className="product-type-value">{keyboard.switches}</span>
      </div>
      <div className="product-type">
        <span className="product-type-name">Type: </span>
        <span className="product-type-value">{keyboard.type}</span>
      </div>
      <div className="product-type">
        <span className="product-type-name">Keycaps: </span>
        <span className="product-type-value">{keyboard.keycaps}</span>
      </div>
    </div>
  )
}

export { ProductType }
