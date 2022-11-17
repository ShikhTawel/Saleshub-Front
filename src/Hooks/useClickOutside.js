import { useEffect } from "react"

const useOutsideClickCustom = (ref, onClickOutside) =>
  useEffect(() => {
    console.log("You clicked outside of me!")
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("You clicked outside of me!")
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener("click", handleClickOutside, true)
    return () => document.removeEventListener("click", handleClickOutside, true)
  }, [onClickOutside])
export default useOutsideClickCustom
