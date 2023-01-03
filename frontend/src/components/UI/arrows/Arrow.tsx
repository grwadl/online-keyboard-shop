import leftArrow from '@/assets/icons/left-arrow.svg'
import rightArrow from '@/assets/icons/right-arrow.svg'

type Props = {
  direction: 'left' | 'right'
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Arrow = ({ direction, className, onClick }: Props) => {
  return (
    <div onClick={onClick} className={`${direction}-arrow arrow absolute top-[45%] ${className ?? ''}`}>
      <img src={direction === 'left' ? leftArrow : rightArrow} className="w-full" alt="arrow" />
    </div>
  )
}

export default Arrow
