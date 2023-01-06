type UnknownArrayOrObject = Array<unknown> | Record<string, unknown>

const isObject = <T extends Record<string, unknown>>(a: unknown): a is T => !!a && a.constructor === Object

const mapNovaPoshtaSimpleReponse = <T extends Record<string, unknown>>(res: Record<string, unknown>, schema: T): T => {
  let mapped = {}
  const schemaKeys = Object.keys(schema) as (keyof T)[]
  const resKeys = Object.keys(res) as (keyof typeof res)[]
  resKeys.forEach((key) => {
    if (schemaKeys.includes(key)) mapped = { ...mapped, [key]: res[key] }
  })

  return mapped as T
}

const mapNovaPoshtaArrayResponse = <T extends Record<string, unknown>>(
  res: UnknownArrayOrObject,
  schema: T
): T | T[] => {
  if (isObject(res)) return mapNovaPoshtaSimpleReponse(res, schema)

  const result: T[] = []
  if (Array.isArray(res)) for (const entry of res) result.push(mapNovaPoshtaSimpleReponse(entry, schema))
  return result
}

export { mapNovaPoshtaArrayResponse }
