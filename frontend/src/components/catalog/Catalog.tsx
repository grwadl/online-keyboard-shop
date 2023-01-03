import { useAppSelector } from '@/redux/common/hooks'
import { SortBar } from '../sort/SortBar'
import CommonHeading from '../UI/CommonHeading'
import './catalog.scss'

type Props = {
  className?: string
}

const Catalog = ({ className }: Props) => {
  const productsQuantity = useAppSelector(({ products }) => products.keyboards)?.length ?? 0

  return (
    <div className={`${className ?? ''} flex justify-between`}>
      <CommonHeading title="Catalog" subtitle={`${productsQuantity} product(s)`} />
      <div className="catalog-sort flex items-center relative">
        <span className="catalog-sort-title text-icon-color">Sort by</span>
        <SortBar />
      </div>
    </div>
  )
}

export { Catalog }
