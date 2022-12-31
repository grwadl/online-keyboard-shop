import { IProduct } from '@/redux/types/reducers/products'
import Product from './Product'

type Props = {
  products: IProduct[]
}

const ProductsList = ({ products }: Props) => {
  return (
    <ul className="products-list flex flex-wrap">
      {products?.map((it) => (
        <Product key={it.id} className="flex-shrink-0 flex-grow-0 basis-[25%]" product={it} />
      ))}
    </ul>
  )
}

export { ProductsList }
