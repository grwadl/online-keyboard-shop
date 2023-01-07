import { useGeneratePages } from '@/hooks/useGeneratePages'
import { changeLimitAction, changePageAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { useCallback, useEffect, useState } from 'react'
import Arrow from '../UI/arrows/Arrow'
import { Limits } from './Limits'
import { PageList } from './PageList'

type Props = {
  className?: string
}

const avaliableLimits = [8, 12, 16]

const Pagination = ({ className }: Props) => {
  const [activePage, setActivePage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(8)

  const dispatch = useAppDispatch()
  const { totalProducts } = useAppSelector(({ products }) => products)
  const numberedPages = useGeneratePages(totalProducts, limit)

  const setActivePageHandler = useCallback((p: number) => setActivePage(p), [])
  const setActiveLimit = useCallback((lim: number) => setLimit(lim), [])

  useEffect(() => {
    dispatch(changePageAction(activePage))
  }, [activePage])

  useEffect(() => {
    dispatch(changeLimitAction(limit))
  }, [limit])

  return (
    <div className={`container sm:flex gap-x-20 ${className ?? ''}`}>
      <div className="limits-wrap flex items-center gap-4">
        <h3 className="text-icon-color">Products on page: </h3>
        <Limits setLimit={setActiveLimit} activeLimit={limit} limits={avaliableLimits} />
      </div>
      <div className="pagination-container flex items-center gap-4">
        <Arrow className="cursor-pointer" onClick={() => setActivePage((v) => (v <= 1 ? v : v - 1))} direction="left" />
        <PageList setActive={setActivePageHandler} active={activePage} totalPages={numberedPages} />
        <Arrow
          className="cursor-pointer"
          onClick={() => setActivePage((v) => (v >= numberedPages.length ? v : v + 1))}
          direction="right"
        />
      </div>
    </div>
  )
}

export { Pagination }
