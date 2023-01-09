import { useMemo } from 'react'

const useGeneratePages = (totalProducts: number, maxOnPage = 10): [number[], boolean] => {
  const totalPages = useMemo(() => Math.ceil(totalProducts / maxOnPage), [totalProducts, maxOnPage])
  const numberedPages = useMemo<number[]>(() => {
    const result: number[] = []
    for (let index = 2; index <= totalPages - 1; index++) {
      result.push(index)
    }
    return result
  }, [totalPages])
  return totalPages === 2 ? [[], true] : [numberedPages, false]
}

export { useGeneratePages }
