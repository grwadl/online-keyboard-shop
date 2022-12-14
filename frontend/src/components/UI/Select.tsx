import React from 'react'
import { Filter } from '../filter/types'
import { Option } from './Option'

type Props = {
  filter: Filter
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Select = ({ filter, onChange }: Props) => {
  return (
    <div className="select-wrapper">
      <h4>{filter.name}</h4>
      {filter.options.map((op) => (
        <Option
          checked={op.checked}
          onChange={onChange}
          label={op.name}
          key={op.name}
        />
      ))}
    </div>
  )
}

export { Select }
