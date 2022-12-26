import React, { useEffect, useRef, useState } from 'react'

type Props<T> = {
  className?: string
  slides: T[]
  renderItem: (item: T) => React.ReactNode
}

const Slider = <T,>({ slides, className, renderItem }: Props<T>) => {
  const [isDown, setIsDown] = useState<boolean>(false)
  const [startX, setStartX] = useState(0)
  const [previousTransition, setPreviousTransition] = useState(0)
  const [maxScrollValue, setMaxScrollValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const resizeListener = () => {
    const carousel = ref.current as HTMLDivElement
    const container = carousel.firstChild as HTMLDivElement

    const firstChild = container.firstChild as HTMLDivElement
    if (!firstChild) return
    const amountIntersectingElements = container.offsetWidth / firstChild.offsetWidth
    const amountOfPixelsInintersectingElements = amountIntersectingElements * firstChild.offsetWidth
    const amountOfScrollCycles = container.childElementCount / amountIntersectingElements - 1
    const maxScrollValue = amountOfScrollCycles * amountOfPixelsInintersectingElements
    setMaxScrollValue(maxScrollValue)
  }

  useEffect(() => {
    resizeListener()

    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [ref.current])

  const onTouchMoveHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDown) return
    const carousel = ref.current as HTMLDivElement
    const newStartX = e.targetTouches[0].pageX
    const firstChild = carousel.firstChild as HTMLDivElement
    const newPosition = previousTransition + startX - newStartX
    firstChild.style.transform = `translateX(${-newPosition}px)`
  }

  const onTouchStartHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    const newStartX = e.targetTouches[0].pageX
    setStartX(newStartX)
    setIsDown(true)
  }

  const handleApproachingEnd = (el: HTMLDivElement, pixels: number) => {
    el.style.cssText = `transform: translateX(${pixels}px); transition: transform 0.3s`
    setPreviousTransition(-pixels)
  }

  const onTouchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDown(false)
    const carousel = ref.current as HTMLDivElement
    const firstChild = carousel.firstChild as HTMLDivElement

    const newTransition = startX - e.changedTouches[0].pageX
    const newPosition = previousTransition + newTransition
    if (newPosition >= maxScrollValue) return handleApproachingEnd(firstChild, -maxScrollValue)
    else if (newPosition < 0) return handleApproachingEnd(firstChild, 0)
    setPreviousTransition(newPosition)
  }

  return (
    <div
      ref={ref}
      onTouchStart={onTouchStartHandler}
      onTouchEnd={onTouchEndHandler}
      onTouchMove={onTouchMoveHandler}
      className={`overflow-x-hidden flex bg-main-accent ${className ?? ''}`}
    >
      <div className="slides-wrap flex w-full">{slides?.map(renderItem)}</div>
    </div>
  )
}

export { Slider }
