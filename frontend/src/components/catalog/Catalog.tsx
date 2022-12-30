import { useAppSelector } from '@/redux/common/hooks'
import { SortBar } from '../sort/SortBar'
import './catalog.scss'

type Props = {
  className?: string
}

const Catalog = ({ className }: Props) => {
  const productsQuantity = useAppSelector(({ products }) => products.keyboards)?.length ?? 0

  return (
    <div className={`${className ?? ''} flex justify-between`}>
      <div className="catalog-info flex items-center gap-2">
        <div className="catalog-info-title font-bold">Catalog</div>
        <div className="catalog-info-quantity text-icon-color mt-1">{productsQuantity} product(s)</div>
      </div>
      <div className="catalog-sort flex items-center relative">
        <span className="catalog-sort-title text-icon-color">Sort by</span>
        <SortBar />
      </div>
    </div>
  )
}

export { Catalog }
