import filterIcon from '@/assets/icons/filter.png'
import { useAppSelector } from '@/redux/common/hooks'
import CommonHeading from '../UI/CommonHeading'
import { SortBar } from '../sort/SortBar'
import './catalog.scss'

type Props = {
  className?: string
  showFiltersMenu: () => void
}

const Catalog = ({ className, showFiltersMenu }: Props) => {
  const productsQuantity = useAppSelector(({ products }) => products.totalProducts) ?? 0

  return (
    <div className={`${className ?? ''} flex justify-between items-center`}>
      <CommonHeading title="Catalog" subtitle={`${productsQuantity} product(s)`} />
      <div className="hidden md:flex catalog-sort items-center w-80 relative">
        <span className="flex-0 basis-14 catalog-sort-title text-icon-color">Sort by</span>
        <SortBar className="flex-1 basis-36" />
      </div>
      <div className="filters-btn block md:hidden cursor-pointer" onClick={showFiltersMenu}>
        <img src={filterIcon} className="h-7" alt="filter-icon" />
      </div>
    </div>
  )
}

export { Catalog }
