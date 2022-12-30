type Props = {
  className?: string
  text: string
}

const Tag = ({ text, className }: Props) => {
  return (
    <div className="tag-wrap py-2 px-3 text-[12px] relative">
      <div className={`tag bg-tag absolute top-0 left-0 w-full h-full z-0 rounded-md ${className}`}></div>
      <span className="span-text z-10">{text}</span>
    </div>
  )
}

export { Tag }
