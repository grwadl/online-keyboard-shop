import { changeFilters } from '@/redux/actions/filters-action'
import { changeFilterAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import React, { useCallback, useEffect } from 'react'
import { Select } from '../UI/Select'

type Props = {
  className?: string
}

const FilterList = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(({ filters }) => filters)

  const onChangeFilterHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeFilters(e, selectedFilters)),
    [selectedFilters]
  )

  // const generatedQuery = useAppSelector(({ query }) => query.)
  useEffect(() => {
    dispatch(changeFilterAction(selectedFilters))
  }, [selectedFilters])

  // useEffect(() => {
  //   dispatch(changeFilteredProducts(generatedQuery))
  // }, [generatedQuery])

  return (
    <div className={`${className}`}>
      <Select onChange={onChangeFilterHandler} name="Switches" filter={selectedFilters.switches} />
      <Select onChange={onChangeFilterHandler} name="Keycaps" filter={selectedFilters.keycaps} />
      <Select onChange={onChangeFilterHandler} name="Type" filter={selectedFilters.type} />
    </div>
  )
}

export { FilterList }
