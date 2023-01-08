import { memo, useMemo } from 'react'
import { Square } from '../UI/square/Square'

type Props = {
  totalPages: number[]
  active: number
  className?: string
  setActive: (value: number) => void
}

const PAGINATION_STEP = 1
const MAX_MIDDLE_SQUARE_LENGTH = 5

const PageList = memo(({ totalPages, className, active, setActive }: Props) => {
  const showedPages = useMemo<number[]>(() => {
    const isFirstActiveAndLong = active - 1 <= PAGINATION_STEP * 2 && MAX_MIDDLE_SQUARE_LENGTH + 1 <= totalPages.length
    if (isFirstActiveAndLong) return Array.from({ length: MAX_MIDDLE_SQUARE_LENGTH - 1 }, (_, i) => i + 2)

    const isLastActiveAndLong =
      totalPages.length + 2 - active <= PAGINATION_STEP * 2 && MAX_MIDDLE_SQUARE_LENGTH + 1 <= totalPages.length
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

  return (
    <>
      <Square
        onClick={() => setActive(1)}
        className={`${className ?? ''} ${1 === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'}`}
      >
        1
      </Square>
      {isShowingLeftDot && <Square className="bg-light-gray text-black">...</Square>}
      {showedPages?.map((p) => (
        <Square
          key={p}
          onClick={() => setActive(p)}
          className={`${className ?? ''} ${p === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'}`}
        >
          {p}
        </Square>
      ))}
      {isShowingRightDot && <Square className="bg-light-gray text-black">...</Square>}
      <Square
        onClick={() => setActive(totalPages.length + 2)}
        className={`${className ?? ''} ${
          totalPages.length + 2 === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'
        }`}
      >
        {totalPages.length + 2}
      </Square>
    </>
  )
})

export { PageList }
