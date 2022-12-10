import { Button } from '../ui/Button'
import '@styles/base/aside.scss'
import Link from 'next/link'
import { VerticalList } from './aside/VerticalList'
import LikeImg from '@public/icons/like.svg'
import ProfileImg from '@public/icons/profile.svg'

export interface INav {
  img: string
  title: string
  href: string
}

const Aside = () => {
  const items: INav[] = [
    { href: '/profile', img: ProfileImg, title: 'Profile' },
    { href: '/cart', img: LikeImg, title: 'Cart' },
    { href: '/', img: LikeImg, title: 'home' }
  ]
  return (
    <div className="aside-wrap px-10 bg-second-color h-full border-solid border-black border-2">
      <Link href="/">
        <Button className="aside-button">Catalog</Button>
      </Link>
      <VerticalList items={items} />
    </div>
  )
}

export { Aside }
