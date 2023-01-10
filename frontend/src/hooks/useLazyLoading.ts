import { RefObject, useEffect } from 'react'

type AnyFunc = (...args: any[]) => void

const options: IntersectionObserverInit = { rootMargin: '100px', threshold: 0.25 }
const intersectionObserver: IntersectionObserver = new IntersectionObserver(handleIntersection, options)
const elementsCallbackMap = new WeakMap<Element, AnyFunc>()

function handleIntersection(entries: IntersectionObserverEntry[]): void {
  entries.forEach((entry) => {
    if (!elementsCallbackMap.has(entry.target) || !entry.isIntersecting) return

    const callback = elementsCallbackMap.get(entry.target)
    if (!callback) throw new Error('callback cannot be null')

    intersectionObserver.unobserve(entry.target)
    elementsCallbackMap.delete(entry.target)
    callback()
  })
}

const useLazyLoading = (refEl: RefObject<HTMLElement>, callback: AnyFunc) => {
  useEffect(() => {
    const element = refEl.current
    if (!element) throw new Error('element cannot be null')

    intersectionObserver.observe(element)
    elementsCallbackMap.set(element, callback)
    return () => {
      intersectionObserver.unobserve(element)
      elementsCallbackMap.delete(element)
    }
  }, [])
}

export { useLazyLoading }
