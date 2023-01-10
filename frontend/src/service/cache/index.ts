const cached = <U>(req: () => Promise<U>, lifeTime = 600000): (() => Promise<U>) => {
  let cache: U
  const startOfCaching = Date.now()
  return async () => {
    const now = Date.now()
    if (now - startOfCaching > lifeTime) return req()
    if (cache) return cache as U
    cache = await req()
    return cache
  }
}

const cachedMap = <U>(lifeTime = 600000): ((r: () => Promise<U>, k: string) => Promise<U>) => {
  const cache = new Map<string, U>()
  const startOfCaching = Date.now()
  return async (req: () => Promise<U>, key: string) => {
    if (Date.now() - startOfCaching > lifeTime) return req()
    if (cache.has(key)) return cache.get(key) as U
    const res = await req()
    cache.set(key, res) as U
    return res
  }
}

export { cached, cachedMap }
