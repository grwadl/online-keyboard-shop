import React from 'react'

type Props = {
  className?: string
  imageSrc: string
  title: string
  subtitle: string
  children?: React.ReactNode
}

const MessageBox = ({ className, imageSrc, subtitle, title, children }: Props) => {
  return (
    <div className={`${className ?? ''}`}>
      <div className="not-found-image w-52 h-52">
        <img className="w-full" src={imageSrc} alt="image" />
      </div>
      <h3 className="cart-not-found-title text-2xl font-bold mt-2">{title}</h3>
      <p className="cart-not-found-para text-lg m-3">{subtitle}</p>
      {children}
    </div>
  )
}

export { MessageBox }
