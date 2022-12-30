import { Loader } from '@/components/base/loading/Loader'
import { Catalog } from '@/components/catalog/Catalog'
import { FilterList } from '@/components/filter/FilterList'
import { ProductsList } from '@/components/products/ProductsList'
import { changeFilteredProducts } from '@/redux/actions/products-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { generateQuery } from '@/utils/generateQuery'
import { useEffect } from 'react'

const Homepage = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(({ products }) => products)
  const query = useAppSelector(({ query }) => query)

  useEffect(() => {
    const unifiedQuery = generateQuery(query)
    dispatch(changeFilteredProducts(unifiedQuery))
  }, [query.filters, query.pagination, query.search, query.sort])

  return (
    <div className="flex">
      <FilterList className="flex-0 basis-64" />
      <div className="main-part flex-1 relative">
        <Catalog />
        {products.loading ? (
          <Loader className="absolute top-1/2 left-1/2" />
        ) : (
          <ProductsList products={products.keyboards} />
        )}
      </div>
    </div>
  )
}

export { Homepage }
