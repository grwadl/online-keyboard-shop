import { Catalog } from '@/components/catalog/Catalog'
import { FilterList } from '@/components/filter/FilterList'
import { mockedFilters } from '@/components/filter/mock'
import { ProductsList } from '@/components/products/ProductsList'
import { getAllProducts } from '@/redux/actions/products-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { useEffect } from 'react'

const Homepage = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(({ products }) => products)
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  return (
    <div className="flex">
      <FilterList list={mockedFilters} className="flex-0 basis-64" />
      <div className="main-part">
        <Catalog />
        <ProductsList products={products.keyboards} />
      </div>
    </div>
  )
}

export { Homepage }
