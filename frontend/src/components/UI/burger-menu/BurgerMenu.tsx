import './burger-menu.scss'

type Props = {
  className?: string
  color?: string
  onClick?: () => void
}

const BurgerMenu = ({ className, color, onClick }: Props) => {
  return (
    <div onClick={onClick} className={`burger-menu-wrap relative flex items-center justify-center ${className ?? ''}`}>
      <span className={`burger-menu-center block w-full h-[3px] ${color ?? 'bg-black'}`}></span>
    </div>
  )
}

export { BurgerMenu }
