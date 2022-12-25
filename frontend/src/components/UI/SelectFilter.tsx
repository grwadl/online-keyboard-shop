import React from 'react'
import { FilterSection } from '../filter/types'
import { Hr } from './Hr'
import { Option } from './Option'

type Props = {
  filter: FilterSection[keyof FilterSection]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

const SelectFilter = ({ filter, onChange, name }: Props) => {
  return (
    <div className="select-wrapper mb-4">
      <Hr className="w-[95%]" />
      <h4 className="text-base font-semibold">{name}</h4>
      {filter.options.map((op) => (
        <Option checked={op.checked} onChange={onChange} label={op.name} key={op.name} className="mt-4" />
      ))}
    </div>
  )
}

export { SelectFilter }
