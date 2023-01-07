import { Square } from '../UI/square/Square'

type Props = {
  totalPages: number[]
  active: number
  className?: string
  setActive: (value: number) => void
}

const PageList = ({ totalPages, className, active, setActive }: Props) => {
  return (
    <>
      {totalPages?.map((p) => (
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

export { PageList }
