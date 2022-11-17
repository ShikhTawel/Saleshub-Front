const FAvatar = ({ name, className, width, ...props }) => {
  return (
    <>
      <div
        style={{
          width: `${width ? width : "35"}px`,
          height: `${width ? width : "35"}px`,
          backgroundImage: `URL('https://ui-avatars.com/api/?name=${
            name ? name.split(" ").join("+") : "Fawry Customer"
          }&background=random')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...props}
        className={`rounded ${className}`}
      ></div>
    </>
  )
}
export default FAvatar
