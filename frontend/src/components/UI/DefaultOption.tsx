import { MouseEvent } from 'react'

type Props = {
  name: string
  value: string
  className?: string
  onClick: (e: MouseEvent<HTMLDivElement>) => void
}

const DefaultOption = ({ name, value, className, onClick }: Props) => {
  return (
    <div data-value={value} onClick={onClick} className={`def-option border-2 border-icon-color ${className}`}>
      {name}
    </div>
  )
}

export { DefaultOption }
