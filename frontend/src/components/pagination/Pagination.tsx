import { useGeneratePages } from '@/hooks/useGeneratePages'
import { changePageAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { useCallback, useEffect, useState } from 'react'
import Arrow from '../UI/arrows/Arrow'
import { PageList } from './PageList'

type Props = {
  className?: string
}

const Pagination = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const { totalProducts } = useAppSelector(({ products }) => products)
  const numberedPages = useGeneratePages(totalProducts)
  const [activePage, setActivePage] = useState<number>(1)
  const onClick = useCallback((p: number) => setActivePage(p), [])

  useEffect(() => {
    dispatch(changePageAction(activePage))
  }, [activePage])

  return (
    <div className={`container flex items-center gap-4 ${className ?? ''}`}>
      <Arrow className="cursor-pointer" onClick={() => setActivePage((v) => (v <= 1 ? v : v - 1))} direction="left" />
      <PageList setActive={onClick} active={activePage} totalPages={numberedPages} />
      <Arrow
        className="cursor-pointer"
        onClick={() => setActivePage((v) => (v >= numberedPages.length ? v : v + 1))}
        direction="right"
      />
    </div>
  )
}

export { Pagination }
