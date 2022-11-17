import { NavLink } from "react-router-dom"
import { AiOutlineSchedule } from "react-icons/ai"
import { TbSmartHome } from "react-icons/tb"
import { FaRegUser } from "react-icons/fa"
import { HiOutlineNewspaper, HiOutlineUpload } from "react-icons/hi"

const MobileNavLink = ({ to, children }) => (
  <>
    <NavLink
      to={to}
      className={(navData) =>
        "flex flex-col items-center justify-start  rounded-md py-2 px-3 font-medium  " +
        (navData.isActive ? "bg-white text-orient-500   " : "text-gray-400")
      }
    >
      {children}
    </NavLink>
  </>
)

const MobileMenu = () => (
  <div
    className={
      "sticky bottom-0 mt-auto  block items-center  justify-between rounded-t-2xl border-t bg-white p-3 lg:hidden"
    }
  >
    <div className={"flex w-full items-center justify-between"}>
      <MobileNavLink to="/distribution">
        <AiOutlineSchedule size={25} />
        <span className={"text-xs font-semibold"}> التوزيع</span>
      </MobileNavLink>
      <MobileNavLink to="/customers">
        <FaRegUser size={25} />
        <span className={"text-xs font-semibold"}> العملاء</span>
      </MobileNavLink>
      <MobileNavLink to="/">
        <TbSmartHome style={{ minWidth: "15px" }} size={25} />
        <span className={"text-xs font-semibold"}> الرئيسية</span>
      </MobileNavLink>
      <MobileNavLink to="/product">
        <HiOutlineNewspaper style={{ minWidth: "15px" }} size={25} />
        <span className={"text-xs font-semibold"}> المنتجات</span>
      </MobileNavLink>
      <MobileNavLink to="/oracle">
        <HiOutlineUpload style={{ minWidth: "15px" }} size={25} />
        <span className={"text-xs font-semibold"}> توريد</span>
      </MobileNavLink>
    </div>
  </div>
)
export default MobileMenu
