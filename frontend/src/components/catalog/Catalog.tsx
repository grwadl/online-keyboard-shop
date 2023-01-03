import filterIcon from '@/assets/icons/filter.png'
import { useAppSelector } from '@/redux/common/hooks'
import { SortBar } from '../sort/SortBar'
import CommonHeading from '../UI/CommonHeading'
import './catalog.scss'

type Props = {
  className?: string
  showFiltersMenu: () => void
}

const Catalog = ({ className, showFiltersMenu }: Props) => {
  const productsQuantity = useAppSelector(({ products }) => products.keyboards)?.length ?? 0

  return (
    <div className={`${className ?? ''} flex justify-between items-center`}>
      <CommonHeading title="Catalog" subtitle={`${productsQuantity} product(s)`} />
      <div className="hidden sm:flex catalog-sort items-center relative">
        <span className="catalog-sort-title text-icon-color">Sort by</span>
        <SortBar />
      </div>
      <div className="filters-btn block sm:hidden cursor-pointer" onClick={showFiltersMenu}>
        <img src={filterIcon} className="h-7" alt="filter-icon" />
      </div>
    </div>
  )
}

export { Catalog }
