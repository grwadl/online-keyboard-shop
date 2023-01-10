import { changeFilters } from '@/redux/actions/filters-action'
import { changeFilterAction, changePriceAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import React, { memo, useEffect } from 'react'
import { SelectFilter } from '../UI/SelectFilter'
import { InputRange, RangeValue } from '../UI/input-range/InputRange'

type Props = {
  className?: string
}

const FilterList = memo(({ className }: Props) => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(({ filters }) => filters)

  const onChangeFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeFilters(e, selectedFilters))

  const onChangeInputRange = (values: RangeValue) => dispatch(changePriceAction(values))

  useEffect(() => {
    dispatch(changeFilterAction(selectedFilters))
  }, [selectedFilters])

  return (
    <div className={`${className}`}>
      <InputRange onChangeValuesFunc={onChangeInputRange} step={100} max={10000} min={0} />
      <SelectFilter onChange={onChangeFilterHandler} name="Switches" filter={selectedFilters.switches} />
      <SelectFilter onChange={onChangeFilterHandler} name="Keycaps" filter={selectedFilters.keycaps} />
      <SelectFilter onChange={onChangeFilterHandler} name="Type" filter={selectedFilters.type} />
    </div>
  )
})

export { FilterList }
