type Props = {
  key: string | number
  children: React.ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Square = ({ children, key, className, onClick }: Props) => {
  return (
    <div
      key={key}
      onClick={onClick}
      className={` py-2 px-4 cursor-pointer duration-300 hover:bg-icon-color ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

export { Square }
