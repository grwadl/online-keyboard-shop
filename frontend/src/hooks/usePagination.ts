import { MAX_MIDDLE_SQUARE_LENGTH, PAGINATION_STEP } from '@/components/pagination/PageList'
import { useMemo } from 'react'

const usePagination = (totalPages: number[], active: number): [number[], boolean, boolean] => {
  const showedPages = useMemo<number[]>(() => {
    const isFirstActiveAndLong =
      active - 1 <= PAGINATION_STEP * 2 && MAX_MIDDLE_SQUARE_LENGTH + 1 <= totalPages.length + 1
    if (isFirstActiveAndLong) return Array.from({ length: MAX_MIDDLE_SQUARE_LENGTH - 1 }, (_, i) => i + 2)

    const isLastActiveAndLong =
      totalPages.length + 2 - active <= PAGINATION_STEP * 2 && MAX_MIDDLE_SQUARE_LENGTH + 1 <= totalPages.length + 1
    if (isLastActiveAndLong)
      return Array.from(
        { length: MAX_MIDDLE_SQUARE_LENGTH - 1 },
        (_, i) => ++i + totalPages.length + 2 - MAX_MIDDLE_SQUARE_LENGTH
      )

    return (
      totalPages.filter((page: number) => page >= active - PAGINATION_STEP && page <= active + PAGINATION_STEP) ?? []
    )
  }, [totalPages, active])

  const [isShowingLeftDot, isShowingRightDot] = useMemo<[boolean, boolean]>(() => {
    const firstPage = 1
    const lastPage = totalPages.length + 2
    if (!showedPages.at(0) || !showedPages.at(-1)) return [false, false]

    const lowestShowedPage = showedPages[0] - PAGINATION_STEP
    const highestShowedPage = (showedPages.at(-1) as number) + PAGINATION_STEP
    return [lowestShowedPage > firstPage, highestShowedPage < lastPage]
  }, [showedPages, totalPages.length])

  return [showedPages, isShowingLeftDot, isShowingRightDot]
}

export { usePagination }
