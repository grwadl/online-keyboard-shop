import { IDefaultOption } from './types'

const sortOptions: IDefaultOption[] = [
  {
    name: 'Name',
    value: '-name'
  },
  {
    name: 'Price H => L',
    value: '-price'
  },
  {
    name: 'Price L => H',
    value: '+price'
  }
]

export { sortOptions }
