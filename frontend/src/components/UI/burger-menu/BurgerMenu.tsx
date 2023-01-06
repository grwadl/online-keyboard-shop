import './burger-menu.scss'

type Props = {
  className?: string
  color?: string
  onClick?: () => void
  isOpen: boolean
}

const BurgerMenu = ({ className, color, onClick, isOpen }: Props) => {
  const onToggle = () => {
    if (onClick) onClick()
  }

  return (
    <div
      onClick={onToggle}
      className={`burger-menu-wrap relative flex items-center justify-center ${isOpen ? 'active' : ''} ${
        className ?? ''
      }`}
    >
      <span className={`burger-menu-center block w-full h-[3px] ${color ?? 'bg-black'}`}></span>
    </div>
  )
}

export { BurgerMenu }
