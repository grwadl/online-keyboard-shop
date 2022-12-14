import { Filter } from './types'

const mockedFilters: Filter[] = [
  {
    name: 'Keycaps',
    slug: 'Keycaps',
    options: [
      { name: 'PBT', value: 'pbt', checked: false },
      { name: 'ABS', value: 'abs', checked: false }
    ]
  },
  {
    name: 'Switches',
    slug: 'switches',
    options: [
      { name: 'Red', value: 'red', checked: false },
      { name: 'Blue', value: 'blue', checked: false },
      { name: 'Brown', value: 'brown', checked: false }
    ]
  },
  {
    name: 'Type',
    slug: 'type',
    options: [
      { name: 'Mechanical', value: 'mechanical', checked: false },
      { name: 'Optical', value: 'optical', checked: false }
    ]
  }
]

export { mockedFilters }
