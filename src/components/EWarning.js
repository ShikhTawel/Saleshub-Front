import { HiOutlineInformationCircle } from "react-icons/hi"

const EWarning = ({ msg, children }) => (
  <>
    <div
      className={
        "my-3 flex content-start items-center gap-1 rounded border border-dashed border-amber-500 bg-amber-50 p-2 font-medium text-amber-600"
      }
    >
      <HiOutlineInformationCircle style={{ minWidth: "20px" }} size={25} />
      <span className={"text-right text-sm"}>{msg}</span>
      {children}
    </div>
  </>
)
export default EWarning
