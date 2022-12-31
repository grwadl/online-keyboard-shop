type Props = {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const CloseButton = ({ className, onClick }: Props) => {
  return (
    <div onClick={onClick} className={className}>
      &#10005;
    </div>
  )
}

export { CloseButton }
