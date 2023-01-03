import { Loader } from '@/components/base/loading/Loader'
import { Catalog } from '@/components/catalog/Catalog'
import { FilterList } from '@/components/filter/FilterList'
import { ProductsList } from '@/components/products/ProductsList'
import { closeFilters, openFilters } from '@/redux/actions/modal-actions'
import { changeFilteredProducts } from '@/redux/actions/products-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { generateQuery } from '@/utils/generateQuery'
import { useEffect } from 'react'

const Homepage = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(({ products }) => products)
  const query = useAppSelector(({ query }) => query)
  const isOpenFiltersOnMobile = useAppSelector(({ modal }) => modal.filtersOpen)

  const showFiltersMenu = (): void => {
    dispatch(openFilters())
  }

  const closeFiltersMenu = (): void => {
    dispatch(closeFilters())
  }

  useEffect(() => {
    const unifiedQuery = generateQuery(query)
    dispatch(changeFilteredProducts(unifiedQuery))
  }, [query.filters, query.pagination, query.search, query.sort])

  return (
    <div className="flex">
      <FilterList
        closeFiltersMenu={closeFiltersMenu}
        className={`${
          isOpenFiltersOnMobile ? 'fixed z-10 px-10 top-[50px] left-0 w-full h-full' : 'hidden'
        } bg-white md:block flex-0 md:basis-40 lg:basis-64`}
      />
      <div className="main-part flex-1 relative">
        <Catalog showFiltersMenu={showFiltersMenu} />
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
