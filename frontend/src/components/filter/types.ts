import { FilterSection } from '@/redux/types/reducers/filter-reducer'

interface ChangeFilterFuncProps {
  e: React.ChangeEvent<HTMLInputElement>
  filters: FilterSection
  setFilters: React.Dispatch<React.SetStateAction<FilterSection>>
}

export type { FilterSection, ChangeFilterFuncProps }
