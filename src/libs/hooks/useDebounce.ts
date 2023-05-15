import { useCallback, useEffect, useRef, useState } from 'react'

function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    timer.current = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer.current)
    }
  }, [value, delay])

  const reset = useCallback((value: T) => {
    timer.current && clearTimeout(timer.current)
    setDebouncedValue(value)
  }, [])

  return [debouncedValue, reset]
}

export default useDebounce
