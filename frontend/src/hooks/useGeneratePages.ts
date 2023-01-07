import { useMemo } from 'react'

const useGeneratePages = (totalProducts: number, maxOnPage = 10) => {
  const productOnOnePage = useMemo(() => Math.ceil(totalProducts / maxOnPage), [totalProducts, maxOnPage])
  const numberedPages = useMemo<number[]>(() => {
    const result: number[] = []
    for (let index = 1; index <= productOnOnePage; index++) {
      result.push(index)
    }
    return result
  }, [productOnOnePage])
  return numberedPages
}

export { useGeneratePages }
