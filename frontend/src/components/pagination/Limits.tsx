import { Square } from '../UI/square/Square'

type Props = {
  className?: string
  activeLimit: number
  limits: number[]
  setLimit: (lim: number) => void
}

const Limits = ({ activeLimit, limits, className, setLimit }: Props) => {
  return (
    <div className={`${className ?? ''} flex gap-4`}>
      {limits.map((lim) => (
        <Square
          onClick={() => setLimit(lim)}
          key={lim}
          className={`w-12 flex justify-center  ${
            lim === activeLimit ? 'bg-main-accent text-white' : 'bg-light-gray text-black'
          }`}
        >
          {lim}
        </Square>
      ))}
    </div>
  )
}

export { Limits }
