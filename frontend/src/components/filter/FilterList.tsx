import { changeFilters } from '@/redux/actions/filters-action'
import { changeFilterAction, changeSearchAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { SortBar } from '../sort/SortBar'
import Button from '../UI/Button'
import { CloseButton } from '../UI/CloseButton'
import { MyInput } from '../UI/MyInput'
import { SelectFilter } from '../UI/SelectFilter'
import './filter-list.scss'

type Props = {
  className?: string
  closeFiltersMenu: () => void
}

const FilterList = ({ className, closeFiltersMenu }: Props) => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(({ filters }) => filters)
  const [searchValue, setSearchValue] = useState<string>('')

  const onChangeFilterHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeFilters(e, selectedFilters)),
    [selectedFilters]
  )

  const closeAndSearch = () => {
    closeFiltersMenu()
    dispatch(changeSearchAction(searchValue))
  }

  useEffect(() => {
    dispatch(changeFilterAction(selectedFilters))
  }, [selectedFilters])

  return (
    <div className={`${className} filters`}>
      <div className="relative-wrap">
        <CloseButton className="absolute top-6 right-14 text-3xl" onClick={closeFiltersMenu} />
        <div className="flex w-2/3 sm:hidden z-20 mt-6 catalog-sort items-center relative">
          <span className="catalog-sort-title text-icon-color">Sort by</span>
          <SortBar />
        </div>
        <SelectFilter onChange={onChangeFilterHandler} name="Switches" filter={selectedFilters.switches} />
        <SelectFilter onChange={onChangeFilterHandler} name="Keycaps" filter={selectedFilters.keycaps} />
        <SelectFilter onChange={onChangeFilterHandler} name="Type" filter={selectedFilters.type} />
        <MyInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          otherProps={{ placeholder: 'Type the name of product...' }}
          className="block w-full mb-5 sm:hidden"
        />
        <Button onClick={closeAndSearch} className="w-full block sm:hidden">
          Find
        </Button>
      </div>
    </div>
  )
}

export { FilterList }
