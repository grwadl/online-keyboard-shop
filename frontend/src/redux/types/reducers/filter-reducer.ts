interface Option {
  name: string
  value: string
  checked: boolean
}

interface ChangeFilterReturn {
  toChangeNameOfSection: keyof FilterSection
  changedOptionsInSection: Option[]
}

interface FilterSection {
  keycaps: {
    options: Option[]
  }
  type: { options: Option[] }
  switches: { options: Option[] }
}

export type { FilterSection, Option, ChangeFilterReturn }
