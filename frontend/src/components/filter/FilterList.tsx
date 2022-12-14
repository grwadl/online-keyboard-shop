import { Select } from '../UI/Select'
import { Filter } from './types'

type Props = {
  className?: string
  list: Filter[]
}

const FilterList = ({ className, list }: Props) => {
  const onChange = () => {
    return
  }
  return (
    <div className={`${className}`}>
      {list.map((filter) => (
        <Select filter={filter} onChange={onChange} key={filter.name} />
      ))}
    </div>
  )
}

export { FilterList }
