import { InputHTMLAttributes } from 'react'

function MyInput<T extends InputHTMLAttributes<HTMLInputElement>>(props: T) {
  const { className, ...other } = props

  return (
    <input
      {...other}
      className={`border-border-color border-b-2 px-2 py-1 focus:outline-none  rounded-sm ${className ?? ''}`}
    />
  )
}

export { MyInput }
