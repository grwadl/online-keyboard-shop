import { useLazyLoading } from '@/hooks/useLazyLoading'
import { useRef, useState } from 'react'
import './disappearing.scss'

type Props = {
  src: string
  alt: string
  placeholder: string
  className?: string
}

const LazyLoad = (props: Props) => {
  const { src, alt, placeholder, className } = props

  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const ref = useRef<HTMLImageElement>(null)

  const onIntersection = () => setIsIntersecting(true)
  const onLoad = () => setIsLoaded(true)

  useLazyLoading(ref, onIntersection)

  return (
    <div className={`${className ?? ''} relative`} ref={ref}>
      {isIntersecting && (
        <>
          <img
            className={`w-full h-full absolute z-[1] ${isLoaded ? 'opacity-1' : 'opacity-0'}`}
            src={src}
            alt={alt}
            onLoad={onLoad}
          />
          <img
            className={`w-full h-full absolute z-[2] ${isLoaded ? 'disappearing' : 'appearing'}`}
            src={placeholder}
            alt={alt}
          />
        </>
      )}
    </div>
  )
}

export { LazyLoad }
