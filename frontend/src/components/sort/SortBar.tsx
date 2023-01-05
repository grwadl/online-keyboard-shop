import { changeSortAction } from '@/redux/actions/query-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { MouseEvent, useEffect, useState } from 'react'
import { Select } from '../UI/Select'
import { sortOptions } from './mock'
import './sortbar.scss'
import { IDefaultOption } from './types'

type Props = {
  className?: string
}

type EventWithData = EventTarget & { getAttribute: (da: string) => string }

const SortBar = ({ className }: Props) => {
  const [selectedSort, setSelectedSort] = useState<IDefaultOption>(sortOptions[0])
  const dispatch = useAppDispatch()
  const onChange = (e: MouseEvent<HTMLDivElement>) => {
    const value = (e.target as EventWithData).getAttribute('data-value')

    const newSelectedSort = sortOptions.find((s) => s.value === value)

    if (!newSelectedSort) return
    setSelectedSort(newSelectedSort)
  }

  useEffect(() => {
    dispatch(changeSortAction(selectedSort.value))
  }, [selectedSort.value])

  return (
    <div className={`sort-bar ${className ?? ''}`}>
      <Select
        className="ml-2 h-full w-full whitespace-nowrap cursor-pointer"
        onChange={onChange}
        value={selectedSort.value}
        options={sortOptions}
      />
    </div>
  )
}

export { SortBar }
