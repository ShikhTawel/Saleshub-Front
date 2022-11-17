import EOfferedPrice from "./EOfferedPrice"
import FButton from "./FButton"
import { NO_IMAGE } from "../env"
import { Link } from "react-router-dom"
import {
  AddShoppingCartItem,
  checkCartItemAvailability,
  truncate,
} from "../helpers/utils"
import { useState } from "react"

const EProductBox = ({ productName, price, id, item, thumbnail }) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  return (
    <>
      <div className={"f-col w-52 border"}>
        <Link className={"border-b"} to={`single/${item?.slug}`}>
          <div
            className={"aspect-square w-full "}
            style={{
              backgroundImage: `URL(${thumbnail ? thumbnail : NO_IMAGE})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Link>
        <div className={"f-col  p-3"}>
          <span className={"text-sm font-medium"}>{truncate(productName, 30)}</span>
          <EOfferedPrice
            className={"text-xs font-medium text-red-700"}
            oldPrice={item.max_price}
            currentPrice={item.discount_price}
          />
          <div className={"flex flex-row items-center gap-3"}>
            <span>
              {item.discount_price ? item.discount_price : item.max_price} L.E
            </span>
            {item.discount_price - item.max_price !== 0 && (
              <span className={"text-xs text-gray-500 line-through "}>
                {item.max_price} L.E
              </span>
            )}
          </div>
          <FButton
            disabled={checkCartItemAvailability(item.id) || isBtnDisabled}
            onClick={() => {
              setIsBtnDisabled(true)
              AddShoppingCartItem(item)
            }}
          >
            Add to cart
          </FButton>
        </div>
      </div>
    </>
  )
}
export default EProductBox
