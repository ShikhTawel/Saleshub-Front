const FLabel = ({ isRequired, children, ...props }) => (
  <div className={"flex gap-1"}>
    <label {...props} className={"select-none text-sm"}>
      {children}
    </label>
    {isRequired === true && <span className={"font-bold text-red-500"}>*</span>}
  </div>
)
export default FLabel
