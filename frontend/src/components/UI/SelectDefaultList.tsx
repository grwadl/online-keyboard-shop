import React, { MouseEvent, useEffect, useRef } from 'react'
import { IDefaultOption } from '../sort/types'
import { DefaultOption } from './DefaultOption'

type Props = {
  options: IDefaultOption[]
  showed: boolean
  onChange: (e: MouseEvent<HTMLDivElement>) => void
  setShowed: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectDefaultList = ({ options, showed, setShowed, onChange }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const closeModal = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current?.contains(e.target as Node)) setShowed(false)
    }

    document.addEventListener('click', closeModal, true)
    return () => {
      document.removeEventListener('click', closeModal, true)
    }
  }, [])

  return (
    <div ref={ref} className={`option-list top-7 block z-[20] mt-3 left-0 absolute w-full ${!showed ? 'hidden' : ''}`}>
      {options.map((option) => (
        <DefaultOption {...option} onClick={onChange} className="py-2 pl-2 cursor-pointer bg-white" key={option.name} />
      ))}
    </div>
  )
}

export { SelectDefaultList }
