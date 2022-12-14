import React from 'react'

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const Button = ({ children, onClick, className, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`p-2 bg-main-accent text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
