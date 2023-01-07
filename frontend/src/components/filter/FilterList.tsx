import { changeFilters } from '@/redux/actions/filters-action'
import { changeFilterAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import React, { memo, useCallback, useEffect } from 'react'
import { SelectFilter } from '../UI/SelectFilter'

type Props = {
  className?: string
}

const FilterList = memo(({ className }: Props) => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(({ filters }) => filters)

  const onChangeFilterHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeFilters(e, selectedFilters)),
    [selectedFilters]
  )

  useEffect(() => {
    dispatch(changeFilterAction(selectedFilters))
  }, [selectedFilters])

  return (
    <div className={`${className}`}>
      <SelectFilter onChange={onChangeFilterHandler} name="Switches" filter={selectedFilters.switches} />
      <SelectFilter onChange={onChangeFilterHandler} name="Keycaps" filter={selectedFilters.keycaps} />
      <SelectFilter onChange={onChangeFilterHandler} name="Type" filter={selectedFilters.type} />
    </div>
  )
})

export { FilterList }
