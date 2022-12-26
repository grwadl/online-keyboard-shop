import React from 'react'

interface OnTouchMoveProps {
  e: React.TouchEvent<HTMLDivElement>
  previousTransition: number
  ref: React.RefObject<HTMLDivElement>
  isDown: boolean
  startX: number
  setPreviousTransition: React.Dispatch<React.SetStateAction<number>>
}

interface OnArrowMoveProps {
  e: React.MouseEvent<HTMLDivElement>
  ref: React.RefObject<HTMLDivElement>
  widthOfElement: number
  previousTransition: number
  maxScrollValue: number
  setPreviousTransition: React.Dispatch<React.SetStateAction<number>>
}

interface OnTouchStartProps {
  e: React.TouchEvent<HTMLDivElement>
  setStartX: React.Dispatch<React.SetStateAction<number>>
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>
}

interface HandleApproachingProps {
  el: HTMLDivElement
  pixels: number
  setPreviousTransition: React.Dispatch<React.SetStateAction<number>>
}

interface OnTouchEndProps {
  e: React.TouchEvent<HTMLDivElement>
  setIsDown: React.Dispatch<React.SetStateAction<boolean>>
  ref: React.RefObject<HTMLDivElement>
  previousTransition: number
  setPreviousTransition: React.Dispatch<React.SetStateAction<number>>
  startX: number
  maxScrollValue: number
}

interface ResizeListenerProps {
  setWidthOfElement: React.Dispatch<React.SetStateAction<number>>
  setMaxScrollValue: React.Dispatch<React.SetStateAction<number>>
  ref: React.RefObject<HTMLDivElement>
}

export type {
  OnTouchMoveProps,
  OnArrowMoveProps,
  OnTouchStartProps,
  HandleApproachingProps,
  OnTouchEndProps,
  ResizeListenerProps
}
