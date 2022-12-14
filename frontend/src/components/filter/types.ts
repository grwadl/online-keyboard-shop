interface Option {
  name: string
  value: string
  checked: boolean
}

interface Filter {
  name: string
  slug: string
  value?: Option['value'][]
  options: Option[]
}

export type { Filter, Option }
