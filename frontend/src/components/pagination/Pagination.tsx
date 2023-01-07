import { useGeneratePages } from '@/hooks/useGeneratePages'
import { changePageAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { useCallback, useEffect, useState } from 'react'
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
    <div className={`container ${className ?? ''}`}>
      <PageList setActive={onClick} active={activePage} totalPages={numberedPages} />
    </div>
  )
}

export { Pagination }
