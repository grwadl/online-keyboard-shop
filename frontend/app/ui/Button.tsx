'use client'
import { MouseEvent, PropsWithChildren } from 'react'
import './button.scss'

type MyBtnProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const Button = ({
  children,
  onClick,
  className
}: PropsWithChildren & MyBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`my-btn text-white text-2xl py-3 px-14 rounded-2xl ${className}`}
    >
      {children}
    </button>
  )
}

export { Button }
