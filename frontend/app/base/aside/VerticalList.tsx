import Image from 'next/image'
import { INav } from '../Aside'

interface IProps {
  className?: string
  items: INav[]
}

function VerticalList({ items, className }: IProps) {
  return (
    <ul className={`List text-white ${className}`}>
      {items.map((it) => (
        <li className="flex gap-4 w-full items-center my-5" key={it.href}>
          <Image src={it.img} className="w-8" alt={it.title} />
          <span className="menu-list-text text-2xl">{it.title}</span>
        </li>
      ))}
    </ul>
  )
}

export { VerticalList }
