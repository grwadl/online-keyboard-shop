import notFound from '@/assets/images/not-found.svg'
import { setNullFilters } from '@/redux/actions/filters-action'
import { changeSearchAction } from '@/redux/actions/query-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { IProduct } from '@/redux/types/reducers/products'
import { useCallback } from 'react'
import { batch } from 'react-redux'
import Button from '../UI/Button'
import { MessageBox } from '../UI/MessageBox'
import Product from './Product'
import './product-list.scss'

type Props = {
  products: IProduct[]
  isLoading: boolean
}

const ProductsList = ({ products, isLoading }: Props) => {
  const dispatch = useAppDispatch()
  const clearFilters = useCallback(() => {
    batch(() => {
      dispatch(setNullFilters())
      dispatch(changeSearchAction(''))
    })
  }, [])

  if (!products?.length && !isLoading)
    return (
      <MessageBox
        className="cart-page w-full h-full flex flex-col justify-center items-center"
        title="Not found"
        subtitle="Unfortunately i can't find any suitable products..."
        imageSrc={notFound}
      >
        <Button className="px-3 py-2 text-lg" onClick={clearFilters}>
          Clear Filters
        </Button>
      </MessageBox>
    )

  return (
    <ul className="products-list flex gap-2 flex-wrap">
      {products?.map((it) => (
        <Product key={it.id} className="flex-shrink-0" product={it} />
      ))}
    </ul>
  )
}

export { ProductsList }
