import { useEffect, useState } from 'react'

export const useActiveElement = () => {
  const [activeElement, setActiveElement] = useState(document.activeElement)

  useEffect(() => {
    const onFocus = () => {
      setActiveElement(document.activeElement)
    }

    const handleBlur = () => {
      setActiveElement(null)
    }

    window.addEventListener('focus', onFocus, true)
    document.addEventListener('blur', handleBlur, true)

    return () => {
      window.removeEventListener('focus', onFocus, true)
      document.removeEventListener('blur', handleBlur, true)
    }
  }, [])

  return activeElement
}
