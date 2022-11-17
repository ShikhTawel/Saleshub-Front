const FFlexWrapper = ({ gap, children }) => (
  <div className={`flex items-center justify-center whitespace-nowrap ${gap}`}>
    {children}
  </div>
)
export default FFlexWrapper
