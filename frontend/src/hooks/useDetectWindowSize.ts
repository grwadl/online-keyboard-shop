import { changeWindowSize } from '@/redux/actions/page-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { useEffect, useState } from 'react'

const useDetectWindowSize = () => {
  const dispatch = useAppDispatch()
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  let timeOut: NodeJS.Timeout

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => dispatch(changeWindowSize(+window.innerWidth)), 200)
    }
    if (isFirstRender) {
      setIsFirstRender(false)
      dispatch(changeWindowSize(+window.innerWidth))
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
}

export { useDetectWindowSize }
