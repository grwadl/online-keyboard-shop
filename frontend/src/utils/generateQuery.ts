import { InititalStateQueery } from '@/redux/types/reducers/query-reducer'

const generateQuery = (query: InititalStateQueery): string =>
  (Object.keys(query ?? {}) as (keyof typeof query)[])
    ?.map((key) => query[key])
    ?.filter((val) => !!val)
    ?.join('&') ?? ''

export { generateQuery }
