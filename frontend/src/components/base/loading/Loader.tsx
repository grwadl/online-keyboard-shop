import './loader.scss'

type Props = {
  className?: string
}

const Loader = ({ className }: Props) => {
  return <div className={`loader-pic w-10 h-10 ${className ?? ''}`}></div>
}

export { Loader }
