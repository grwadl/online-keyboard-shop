import { changeFilters } from '@/redux/actions/filters-action'
import { changeFilterAction, changePriceAction, changeSearchAction } from '@/redux/actions/query-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Button from '../UI/Button'
import { CloseButton } from '../UI/CloseButton'
import { MyInput } from '../UI/MyInput'
import { SelectFilter } from '../UI/SelectFilter'
import { SortBar } from '../sort/SortBar'

import { InputRange, RangeValue } from '../UI/input-range/InputRange'
import './filter-list.scss'

type Props = {
  className?: string
  isOpenFiltersOnMobile: boolean
  closeFiltersMenu: () => void
}

const MobileFilterList = memo(({ className, closeFiltersMenu, isOpenFiltersOnMobile }: Props) => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(({ filters }) => filters)
  const [searchValue, setSearchValue] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null)

  const onChangeInputRange = useCallback((values: RangeValue) => dispatch(changePriceAction(values)), [])

  const onChangeFilterHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeFilters(e, selectedFilters)),
    [selectedFilters]
  )

  const closeAndSearch = () => {
    closeFiltersMenu()
    dispatch(changeSearchAction(searchValue))
  }

  useEffect(() => {
    return () => closeFiltersMenu()
  }, [])

  useEffect(() => {
    dispatch(changeFilterAction(selectedFilters))
  }, [selectedFilters])

  return (
    <CSSTransition classNames="my-node" nodeRef={ref} in={isOpenFiltersOnMobile} unmountOnExit timeout={300}>
      <div role="listbox" className={`${className} mobile-filters filters`} ref={ref}>
        <CloseButton className="absolute top-6 right-14 text-3xl" onClick={closeFiltersMenu} />
        <div className="flex w-2/3 z-20 mt-6 catalog-sort items-center relative">
          <span className="catalog-sort-title text-icon-color">Sort by</span>
          <SortBar className="w-32 ml-2" />
        </div>
        <InputRange
          title="Price"
          className="mt-5"
          onChangeValuesFunc={onChangeInputRange}
          step={100}
          max={10000}
          min={0}
        />
        <SelectFilter onChange={onChangeFilterHandler} name="Switches" filter={selectedFilters.switches} />
        <SelectFilter onChange={onChangeFilterHandler} name="Keycaps" filter={selectedFilters.keycaps} />
        <SelectFilter onChange={onChangeFilterHandler} name="Type" filter={selectedFilters.type} />
        <MyInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Type the name of product..."
          className="block w-full mb-5"
        />
        <Button onClick={closeAndSearch} className="w-full block">
          Find
        </Button>
      </div>
    </CSSTransition>
  )
})

export { MobileFilterList }
