import { Square } from '../UI/square/Square'

type Props = {
  showedPages: number[]
  className?: string
  setActive: (value: number) => void
  active: number
}

const SquareMiddlePagesList = ({ setActive, showedPages, className, active }: Props) => {
  return (
    <>
      {showedPages?.map((p) => (
        <Square
          key={p}
          onClick={() => setActive(p)}
          className={`${className ?? ''} ${p === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'}`}
        >
          {p}
        </Square>
      ))}
    </>
  )
}

export { SquareMiddlePagesList }
