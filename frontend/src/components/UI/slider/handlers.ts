import type {
  HandleApproachingProps,
  OnArrowMoveProps,
  OnTouchEndProps,
  OnTouchMoveProps,
  OnTouchStartProps,
  ResizeListenerProps
} from './types'

const onTouchMoveHandler = (props: OnTouchMoveProps) => {
  const { e, isDown, previousTransition, ref, startX } = props
  if (!isDown) return
  const newStartX = e.targetTouches[0].pageX
  const slidesContainer = ref.current as HTMLDivElement as HTMLDivElement
  const newPosition = previousTransition + startX - newStartX
  slidesContainer.style.transform = `translateX(${-newPosition}px)`
}

const handleMoveByArrow = (props: OnArrowMoveProps) => {
  const { e, previousTransition, ref, widthOfElement, maxScrollValue, setPreviousTransition } = props
  const target = e.target as HTMLElement
  const isMovingForward =
    target.classList.contains('right-arrow') || (target.parentElement as HTMLElement).classList.contains('right-arrow')
  const scrollCoefficient = isMovingForward ? 1 : -1
  const slidesContainer = ref.current as HTMLDivElement
  const newScrollValue = scrollCoefficient * widthOfElement + previousTransition
  const isAlreadyAtTheEnd =
    (previousTransition === 0 && newScrollValue <= previousTransition) ||
    (previousTransition === maxScrollValue && newScrollValue >= previousTransition)

  if (isAlreadyAtTheEnd) return

  if (newScrollValue < 0) return handleApproachingEnd({ el: slidesContainer, pixels: 0, setPreviousTransition })
  if (newScrollValue > maxScrollValue)
    return handleApproachingEnd({ el: slidesContainer, pixels: -maxScrollValue, setPreviousTransition })
  handleApproachingEnd({ el: slidesContainer, pixels: -newScrollValue, setPreviousTransition })
}

const onTouchStartHandler = (props: OnTouchStartProps) => {
  const { e, setIsDown, setStartX } = props
  const newStartX = e.targetTouches[0].pageX
  setStartX(newStartX)
  setIsDown(true)
}

const handleApproachingEnd = (props: HandleApproachingProps) => {
  const { el, pixels, setPreviousTransition } = props
  el.style.cssText = `transform: translateX(${pixels}px); transition: transform 0.3s`
  setPreviousTransition(-pixels)
}

const onTouchEndHandler = (props: OnTouchEndProps) => {
  const { e, previousTransition, ref, setIsDown, setPreviousTransition, maxScrollValue, startX } = props
  setIsDown(false)
  const slidesContainer = ref.current as HTMLDivElement
  const newTransition = startX - e.changedTouches[0].pageX
  const newPosition = previousTransition + newTransition
  if (newPosition >= maxScrollValue)
    return handleApproachingEnd({ el: slidesContainer, pixels: -maxScrollValue, setPreviousTransition })
  else if (newPosition < 0) return handleApproachingEnd({ el: slidesContainer, pixels: 0, setPreviousTransition })
  setPreviousTransition(newPosition)
}

const resizeListener = (props: ResizeListenerProps) => {
  const { ref, setMaxScrollValue, setWidthOfElement } = props
  const slideContainer = ref.current as HTMLDivElement as HTMLDivElement
  const slide = slideContainer.firstChild as HTMLDivElement
  if (!slide) return
  setWidthOfElement(+slide.offsetWidth)
  const amountIntersectingElements = slideContainer.offsetWidth / slide.offsetWidth
  const amountOfPixelsIntersectingElements = amountIntersectingElements * slide.offsetWidth
  let amountOfScrollCycles = slideContainer.childElementCount / amountIntersectingElements - 1
  amountOfScrollCycles = amountOfScrollCycles < 0 ? 0 : amountOfScrollCycles
  const maxScrollValue = amountOfScrollCycles * amountOfPixelsIntersectingElements
  console.log(amountOfScrollCycles)

  setMaxScrollValue(maxScrollValue)
}

export { onTouchEndHandler, onTouchMoveHandler, onTouchStartHandler, handleMoveByArrow, resizeListener }
