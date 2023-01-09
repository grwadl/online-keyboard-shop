import { useGeneratePages } from '@/hooks/useGeneratePages'
import { changeLimitAction, changePageAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { memo, useCallback, useEffect, useState } from 'react'
import Arr from '../UI/arrows/Arrow'
import { Limits as Lim } from './Limits'
import { PageList } from './PageList'

type Props = {
  className?: string
}

const Arrow = memo(Arr)
const Limits = memo(Lim)

const avaliableLimits = [4, 8, 12, 16]

const Pagination = ({ className }: Props) => {
  const [activePage, setActivePage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(8)

  const dispatch = useAppDispatch()
  const { totalProducts } = useAppSelector(({ products }) => products)
  const { filters, price } = useAppSelector(({ query }) => query)
  const [numberedPages, isTwoPages] = useGeneratePages(totalProducts, limit)

  const setActivePageHandler = useCallback((p: number) => setActivePage(p), [])
  const setActiveLimit = useCallback((lim: number) => setLimit(lim), [])

  useEffect(() => {
    dispatch(changePageAction(activePage))
  }, [activePage])

  useEffect(() => {
    setActivePage(1)
  }, [filters, price])

  useEffect(() => {
    setActivePage(1)
    dispatch(changeLimitAction(limit))
  }, [limit])

  return (
    <div className={`container mb-5 ${className ?? ''}`}>
      <div className="limits-wrap flex items-center gap-4">
        <h3 className="text-icon-color">Products on page: </h3>
        <Limits setLimit={setActiveLimit} activeLimit={limit} limits={avaliableLimits} />
      </div>
      <div className="pagination-container flex items-center mt-6 xl:mt-0 gap-4">
        <Arrow className="cursor-pointer" onClick={() => setActivePage((v) => (v <= 1 ? v : v - 1))} direction="left" />
        <PageList
          isTwoPages={isTwoPages}
          setActive={setActivePageHandler}
          active={activePage}
          totalPages={numberedPages}
        />
        <Arrow
          className="cursor-pointer"
          onClick={() => setActivePage((v) => (v >= numberedPages.length + 2 ? v : v + 1))}
          direction="right"
        />
      </div>
    </div>
  )
}

export { Pagination }
