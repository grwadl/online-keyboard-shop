import { useDebounce } from '@/hooks/useDebounce'
import React, { useEffect, useRef, useState } from 'react'
import { MyInput } from '../MyInput'
import './input-range.scss'

type Props = {
  max: number
  min: number
  step: number
  className?: string
  onChangeValuesFunc: (values: RangeValue) => void
}

export type RangeValue = {
  min: number
  max: number
}

const InputRange = ({ max, min, step, className, onChangeValuesFunc }: Props) => {
  const [value, setValue] = useState<RangeValue>({ max: max, min: 0 })
  const lineBetweenRef = useRef<HTMLDivElement>(null)

  const onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value
    const isMovingCloserThanOneStep = newValue - value.min <= step
    const isAlreadyAtOneStep = value.min + step === value.max
    if (isMovingCloserThanOneStep && isAlreadyAtOneStep) return
    if (isMovingCloserThanOneStep) return setValue((v) => ({ ...v, max: value.min + step }))
    setValue((v) => ({ ...v, max: newValue }))
  }

  const onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +e.target.value
    const isMovingCloserThanOneStep = value.max - newValue <= step
    const isAlreadyAtOneStep = value.min === value.max - step
    if (isMovingCloserThanOneStep && isAlreadyAtOneStep) return
    if (isMovingCloserThanOneStep) return setValue((v) => ({ ...v, min: value.max - step }))
    setValue((v) => ({ ...v, min: newValue }))
  }

  useEffect(() => {
    if (!lineBetweenRef.current) return
    const marginLeft = (value.min / max) * 100
    const marginRight = ((max - value.max) / max) * 100
    lineBetweenRef.current.style.left = marginLeft + '%'
    lineBetweenRef.current.style.right = marginRight + '%'
  }, [value.min, value.max, max])

  useDebounce(() => max !== 0 && onChangeValuesFunc(value), [value.max, value.min], 300)

  return (
    <div className={`input-range-wrapper ${className ?? ''}`}>
      <div className="input-range-input-text-container mb-5 flex justify-between">
        <MyInput
          value={value.min}
          className="flex-grow-0 flex-shrink-1 border text-center max-w-[100px]"
          type="number"
          onChange={onChangeMin}
        />
        <MyInput
          value={value.max}
          className="flex-grow-0 flex-shrink-1 border text-center max-w-[100px]"
          type="number"
          onChange={onChangeMax}
        />
      </div>
      <div className="range-inputs-container relative">
        <div className="line z-[1] bg-light-gray w-full h-1 relative top-[3px]" />
        <div className="relative input-wrap h-4">
          <div ref={lineBetweenRef} className="absolute line-between h-1 bg-main-accent z-[2]" />
          <input
            className="range-input min z-[5] bg-transparent appearance-none absolute w-full h-0 bg-transparent pointer-events-none"
            name="min"
            max={max}
            min={min}
            step={step}
            onChange={onChangeMin}
            value={value.min}
            type="range"
          />
          <input
            className="range-input max z-[5] bg-transparent appearance-none absolute w-full h-0 bg-transparent pointer-events-none"
            name="max"
            max={max}
            min={min}
            step={step}
            onChange={onChangeMax}
            value={value.max}
            type="range"
          />
        </div>
      </div>
    </div>
  )
}

export { InputRange }
