import React from 'react'
import './button.scss'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

const Button = ({ children, onClick, className, disabled, type = 'button' }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`my-btn p-2 bg-main-accent text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
