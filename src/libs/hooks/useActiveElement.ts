import { useEffect, useState } from 'react'

const NAME_INPUT_COMMENT = 'content'

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

  let isFocusInput = false
  if (activeElement) {
    if (
      (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') &&
      (activeElement as HTMLInputElement).name !== NAME_INPUT_COMMENT
    ) {
      isFocusInput = true
    }
  }

  return { activeElement, isFocusInput }
}
