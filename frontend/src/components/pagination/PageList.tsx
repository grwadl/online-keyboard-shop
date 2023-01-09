import { usePagination } from '@/hooks/usePagination'
import { memo } from 'react'
import { Square } from '../UI/square/Square'
import { SquareMiddlePagesList } from './SquareMiddlePagesList'

type Props = {
  totalPages: number[]
  active: number
  className?: string
  setActive: (value: number) => void
}

export const PAGINATION_STEP = 1
export const MAX_MIDDLE_SQUARE_LENGTH = 5

const PageList = memo(({ totalPages, className, active, setActive }: Props) => {
  const [showedPages, isShowingLeftDot, isShowingRightDot] = usePagination(totalPages, active)

  return (
    <>
      <Square
        onClick={() => setActive(1)}
        className={`${className ?? ''} ${1 === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'}`}
      >
        1
      </Square>
      {isShowingLeftDot && <Square className="bg-light-gray text-black">...</Square>}
      <SquareMiddlePagesList active={active} setActive={setActive} showedPages={showedPages} />
      {isShowingRightDot && <Square className="bg-light-gray text-black">...</Square>}
      {totalPages.length !== 0 && (
        <Square
          onClick={() => setActive(totalPages.length + 2)}
          className={`${className ?? ''} ${
            totalPages.length + 2 === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'
          }`}
        >
          {totalPages.length + 2}
        </Square>
      )}
    </>
  )
})

export { PageList }
