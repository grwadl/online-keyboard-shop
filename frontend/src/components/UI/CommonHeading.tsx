type Props = {
  title: string
  subtitle: string
  className?: string
}

const CommonHeading = ({ subtitle, title, className }: Props) => {
  return (
    <div className={`catalog-info flex items-center gap-2 ${className ?? ''}`}>
      <div className="catalog-info-title font-bold">{title}</div>
      <div className="catalog-info-quantity text-icon-color mt-1">{subtitle}</div>
    </div>
  )
}

export default CommonHeading
