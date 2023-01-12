import { Loader } from '@/components/base/loading/Loader'
import { Catalog } from '@/components/catalog/Catalog'
import { FilterList } from '@/components/filter/FilterList'
import { MobileFilterList } from '@/components/filter/MobileFilterList'
import { Pagination } from '@/components/pagination/Pagination'
import { ProductsList } from '@/components/products/ProductsList'
import { changeFilteredProducts, getQuantityOfProducts } from '@/redux/actions/internal'
import { closeFilters, openFilters } from '@/redux/actions/modal-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { generateQuery } from '@/utils/generateQuery'
import { useEffect } from 'react'

const Homepage = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(({ products }) => products)
  const query = useAppSelector(({ query }) => query)
  const isOpenFiltersOnMobile = useAppSelector(({ modal }) => modal.filtersOpen)
  const { isOnPc } = useAppSelector(({ page }) => page)
  const showFiltersMenu = (): void => {
    dispatch(openFilters())
  }

  const closeFiltersMenu = (): void => {
    dispatch(closeFilters())
  }

  useEffect(() => {
    dispatch(getQuantityOfProducts())
  }, [])

  useEffect(() => {
    const unifiedQuery = generateQuery(query)
    dispatch(changeFilteredProducts(unifiedQuery))
  }, [query])

  return (
    <div className="flex gap-5 h-full">
      {isOnPc !== null && !isOnPc ? (
        <MobileFilterList
          isOpenFiltersOnMobile={isOpenFiltersOnMobile}
          closeFiltersMenu={closeFiltersMenu}
          className="block md:hidden fixed z-[5] px-10 top-[48px] left-0 w-full h-full bg-white flex-0"
        />
      ) : (
        <FilterList className="hidden  grow-0 overflow-hidden md:block md:basis-40 lg:basis-64" />
      )}

      <div className="main-part flex-1 h-full relative">
        <Catalog showFiltersMenu={showFiltersMenu} />
        <Pagination className="block xl:flex mt-8 items-center gap-x-20" />
        {products.loading ? (
          <Loader className="absolute top-1/2 left-1/2" />
        ) : (
          <ProductsList isLoading={products.loading} products={products.keyboards} />
        )}
      </div>
    </div>
  )
}

export { Homepage }
