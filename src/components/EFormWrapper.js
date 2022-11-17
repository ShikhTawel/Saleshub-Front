const SFormWrapper = ({ children, key, className }) => (
  <div key={key} className={`my-1 flex flex-col gap-2 lg:my-2 lg:my-3 ${className}`}>
    {children}
  </div>
)
export default SFormWrapper
