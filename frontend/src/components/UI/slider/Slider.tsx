import { useEffect, useRef, useState } from 'react'

type Props = {
  className?: string
}
const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Slider = (props: Props) => {
  const [isDown, setIsDown] = useState<boolean>(false)
  const [startX, setStartX] = useState(0)
  const [previousTransition, setPreviousTransition] = useState(0)
  const [maxScrollValue, setMaxScrollValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const resizeListener = () => {
    const carousel = ref.current as HTMLDivElement
    const container = carousel.firstChild as HTMLDivElement

    const firstChild = container.firstChild as HTMLDivElement
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
  }, [])

  const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return
    const carousel = ref.current as HTMLDivElement
    const newStartX = e.pageX
    const firstChild = carousel.firstChild as HTMLDivElement
    const newPosition = previousTransition + startX - newStartX
    firstChild.style.transform = `translateX(${-newPosition}px)`
  }

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const newStartX = e.pageX
    setStartX(newStartX)
    setIsDown(true)
  }

  const handleScrollingEnd = (el: HTMLDivElement, pixels: number) => {
    el.style.cssText = `transform: translateX(${pixels}px); transition: transform 0.3s`
    setPreviousTransition(-pixels)
  }

  const mouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(false)
    const carousel = ref.current as HTMLDivElement
    const firstChild = carousel.firstChild as HTMLDivElement
    const newTransition = startX - e.pageX
    const newPosition = previousTransition + newTransition
    if (newPosition >= maxScrollValue) return handleScrollingEnd(firstChild, -maxScrollValue)
    else if (newPosition < 0) return handleScrollingEnd(firstChild, 0)
    setPreviousTransition(newPosition)
  }

  return (
    <div
      ref={ref}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseUpHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      className="w-80 overflow-x-hidden flex bg-main-accent"
    >
      <div className={`slides-wrap flex w-full ${isDown ? 'cursor-grabbing' : ''}`}>
        {slides.map((s) => (
          <div key={s} className="basis-20 shrink-0 h-20 select-none">
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export { Slider }
