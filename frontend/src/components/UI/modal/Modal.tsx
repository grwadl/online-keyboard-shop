import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  isOpen: boolean
  className?: string
  classNameContainer?: string
  onCloseModal: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Modal = ({ children, isOpen, className, onCloseModal, classNameContainer }: Props) => {
  if (!isOpen) return <></>

  return (
    <div className={`fixed w-full min-h-screen z-10 ${classNameContainer ?? ''}`}>
      <div onClick={onCloseModal} className="absolute bg-header-gray opacity-60 w-full h-full"></div>
      <div className={`${className}`}>{children}</div>
    </div>
  )
}

export { Modal }
