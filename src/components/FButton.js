const FButton = ({ children, className, onClick, btnType, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={` ${className}  ${
        btnType === "danger"
          ? "bg-red-600 text-white   disabled:bg-red-300  "
          : btnType === "success"
          ? "border border-green-500 bg-green-600 text-white disabled:bg-green-300 "
          : btnType === "secondary"
          ? "border border-gray-300 bg-gray-100 text-gray-500 disabled:bg-gray-300"
          : "border border-orient-700 bg-orient-500 text-white ring-orient-500  hover:bg-orient-700 focus:ring-2 focus:ring-offset-2 disabled:border-orient-300 disabled:bg-orient-300"
      } 
                       primary-shadow flex  justify-center rounded-md  p-1.5 font-medium`}
      {...props}
    >
      {children}
    </button>
  )
}
export default FButton
