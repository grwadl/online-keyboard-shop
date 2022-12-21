import { IProduct } from '@/redux/types/reducers/products'
import Product from './Product'

type Props = {
  products: IProduct[]
}

const ProductsList = ({ products }: Props) => {
  return (
    <ul className="products-list flex">
      {products?.map((it) => (
        <Product
          key={it.id}
          className="flex-shrink-1 flex-grow-0 lg:basis-[25%]"
          product={it}
        />
      ))}
    </ul>
  )
}

export { ProductsList }
