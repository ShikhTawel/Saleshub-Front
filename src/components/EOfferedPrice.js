const EOfferedPrice = ({ currentPrice, oldPrice, className }) => {
  const handlePercentage = () =>
    Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
  return (
    <>
      {handlePercentage() !== 0 && (
        <span className={`${className ? className : "font-medium text-red-500"}`}>
          Save {oldPrice - currentPrice} L.E ({handlePercentage()}%)
        </span>
      )}
    </>
  )
}
export default EOfferedPrice
