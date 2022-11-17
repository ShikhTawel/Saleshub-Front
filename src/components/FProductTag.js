const FProductTag = ({ color, productName }) => (
  <span
    className={`border-${color}-700 w-fit bg-${color}-200  text-${color}-800 leading-1 flex h-fit items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-bold`}
  >
    {productName}
  </span>
)
export default FProductTag
