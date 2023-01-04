import { IProduct } from '@/redux/types/reducers/products'
import Product from './Product'
import './product-list.scss'

type Props = {
  products: IProduct[]
}

const ProductsList = ({ products }: Props) => {
  return (
    <ul className="products-list flex gap-2 flex-wrap">
      {products?.map((it) => (
        <Product key={it.id} className="flex-shrink-0" product={it} />
      ))}
    </ul>
  )
}

export { ProductsList }
