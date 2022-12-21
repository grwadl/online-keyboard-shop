import { useEffect } from 'react'

const useDebounce = <T extends (...args: any[]) => void>(fn: T, dependency: unknown, delay?: number) => {
  useEffect(() => {
    const timer = setTimeout(() => fn(), delay ?? 500)
    return () => clearTimeout(timer)
  }, [dependency])
}

export { useDebounce }
