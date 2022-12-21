type Props = {
  className?: string
}

const Catalog = ({ className }: Props) => {
  return <div className={`${className ?? ''}`}>Catalog</div>
}

export { Catalog }
