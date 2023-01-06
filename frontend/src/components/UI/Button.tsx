import { ButtonHTMLAttributes } from 'react'
import './button.scss'

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, children, ...other } = props
  return (
    <button {...other} className={`my-btn p-2 bg-main-accent text-white ${className}`}>
      {children}
    </button>
  )
}

export default Button
