import { HiOutlineInformationCircle } from "react-icons/hi"
import React from "react"

const FInfo = ({ message }) => (
  <>
    <div
      className={
        "flex items-center gap-2 rounded-sm border border-blue-500 bg-blue-50 p-2 text-blue-500"
      }
    >
      <HiOutlineInformationCircle size={25} style={{ minWidth: "20px" }} />
      <span className={"text-right text-sm"}>{message}</span>
    </div>
  </>
)
export default FInfo
