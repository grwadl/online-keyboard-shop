const cached = <U>(req: () => Promise<U>) => {
  let cache: U
  return async () => {
    if (cache) return cache
    cache = await req()
    return cache
  }
}

export { cached }
