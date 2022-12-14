import { Catalog } from '@/components/catalog/Catalog'
import { FilterList } from '@/components/filter/FilterList'
import { ProductsList } from '@/components/products/ProductsList'

const Homepage = () => {
  return (
    <div className="flex">
      <FilterList className="" />
      <div className="main-part">
        <Catalog />
        <ProductsList />
      </div>
    </div>
  )
}

export { Homepage }
