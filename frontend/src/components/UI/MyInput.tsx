import { InputHTMLAttributes } from 'react'

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  className?: string
  otherProps?: InputHTMLAttributes<HTMLInputElement>
}

const MyInput = ({ onChange, value, className, otherProps }: Props) => {
  return (
    <input
      {...otherProps}
      className={`border-border-color border-2 px-2 py-1 focus:outline-none  rounded-sm ${className}`}
      value={value}
      onChange={onChange}
    />
  )
}

export { MyInput }
