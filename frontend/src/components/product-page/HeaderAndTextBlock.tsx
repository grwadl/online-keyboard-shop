import { memo } from 'react'

export type Text = {
  leftSide: string
  rightSide?: string
}

type Props = {
  header: string
  text: Text[]
  className?: string
}

const HeaderAndTextBlock = ({ header, text, className }: Props) => {
  return (
    <div className={`header-and-text-block ${className ?? ''}`}>
      <h3 className="header-block-header text-base text-black">{header}</h3>
      <div className="text-block">
        {text.map((it, idx) => (
          <div key={idx} className="flex justify-between mt-2">
            <div className="left-side-text text-icon-color basis-3/5">{it.leftSide}</div>
            {it.rightSide && <div className="right-side-text text-dark-gray">{it.rightSide}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(HeaderAndTextBlock)
