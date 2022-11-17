import { useLocalStorage } from "../Hooks/useLocalStorage"

const FCollapse = ({ title, callback, children, showCollapseIcon }) => {
  const [isCollapse, setIsCollapse] = useLocalStorage("FCollapse", false)
  return (
    <>
      <div>
        <div
          onClick={() => {
            setIsCollapse(!isCollapse)
            callback(isCollapse)
          }}
          className={
            "collapse-header f-row  select-none justify-between hover:cursor-pointer"
          }
        >
          {title}
        </div>
        <div className={`collapse-body ${isCollapse ? "block" : "hidden"}`}>
          {children}
        </div>
      </div>
    </>
  )
}
export default FCollapse
