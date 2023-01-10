type Props = {
  onClick: (name: string) => void
  active?: string
  className?: string
  name: string
}

const Tab = ({ className, active, onClick, name }: Props) => {
  return (
    <div
      id={name}
      onClick={() => onClick(name)}
      className={`${className ?? ''} ${
        active === name ? 'border-b-2 border-main-accent text-black' : 'text-icon-color'
      } tab-item text-xl cursor-pointer hover:text-dark-gray duration-300`}
    >
      {name}
    </div>
  )
}

export default Tab
