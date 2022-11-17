const FInputField = ({ onChange, value, name, type, ...props }) => (
  <>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={
        "w-full rounded border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
      }
      // autoComplete={'off'}
      {...props}
    />
  </>
)
export default FInputField
