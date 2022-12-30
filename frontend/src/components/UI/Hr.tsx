type Props = {
  className?: string
}

const Hr = ({ className }: Props) => {
  return <hr className={`my-4 text-second-text-color ${className}`} />
}

export { Hr }
