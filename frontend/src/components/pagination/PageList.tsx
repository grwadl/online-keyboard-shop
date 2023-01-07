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
        <div
          key={p}
          onClick={() => setActive(p)}
          className={` py-2 px-4 cursor-pointer duration-300 hover:bg-icon-color ${className ?? ''} ${
            p === active ? 'bg-main-accent text-white' : 'bg-light-gray text-black'
          }`}
        >
          {p}
        </div>
      ))}
    </>
  )
}

export { PageList }
