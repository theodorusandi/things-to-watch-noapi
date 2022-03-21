import { useEffect } from "react"

export const useClickOutside = (ref, eventHandler) => {
  useEffect(() => {
    const clickListener = e => {
      if (ref.current === null || ref.current === e.target) return
      
      eventHandler()
    }

    document.addEventListener("click", clickListener)
    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [ref, eventHandler])
}