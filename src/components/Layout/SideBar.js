import {TbSmartHome } from "react-icons/tb"
import {
  HiChevronLeft,
  HiLogout,

} from "react-icons/hi"
import FFlexWrapper from "../FFlexWrapper"
import { useEffect, useRef, useState } from "react"
import FNavLink from "../FNavLink"
import { FaFileExcel, FaRegStopCircle, FaRegUser } from "react-icons/fa"
import useWindowDimensions from "../../Hooks/useWindowDimensions"
import FButton from "../FButton"


const SideBar = ({ isSideBarOpen, setIsSideBarOpen, onClickOutside }) => {
  const sidebarRef = useRef(null)
  // const [isSideBarOpen, setIsSideBarOpen] =  useState([])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    document.addEventListener("click", handleClickOutside, true)
    return () => document.removeEventListener("click", handleClickOutside, true)
  }, [onClickOutside])

  const [isCollapse, setCollapse] = useState(false)

  const { width } = useWindowDimensions()

  function logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    localStorage.removeItem('access_token')
    window.location.href = '/'
  }

  return (
    <div
      ref={sidebarRef}
      style={
        width < 768
          ? { right: isSideBarOpen ? "0px" : "-250px", position: "relative"}
          : { position: "relative"}
      }
      className={"z-20 h-screen"}
    >
      <div
        style={isCollapse ? { width: "70px", minWidth: "70px"} : { width: "250px"}}
        className={`${
            //  "bg-gray-900"
             "hidden bg-orient-500"
          }  f-col h-full `}
      >
        <div className={"py-2 px-4"}>
          <div className={"f-col gap-1  "}>
            <div className={"f-col-center-center"}>
              <img
                src={require("../../assets/images/logo.jpg")}
                width={100}
                alt="logo"
              />
            </div>
            <FNavLink
              setIsSideBarOpen={setIsSideBarOpen}
              to={"/dashboard"}
            >
              <TbSmartHome style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                الصفحة الرئيسية
              </span>
            </FNavLink>

            
            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/dashboard/reset-user-password"}>
              <FaRegUser size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
               تغيير كلمة المرور
              </span>
            </FNavLink>
            
            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/dashboard/upload-data"}>
              <FaFileExcel size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
               رفع ملفات اكسل
              </span>
            </FNavLink>

            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/dashboard/remove-penalty"}>
              <FaRegStopCircle size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                الغاء مخالفة
              </span>
            </FNavLink>

            <FButton  onClick={() => logout()}  >
              <HiLogout style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                الخروج
              </span>
            </FButton>
          </div>
        </div>
        <div
          onClick={() => setCollapse(!isCollapse)}
          className={
            "mt-auto cursor-pointer border-t border-t-orient-400 p-4 text-white"
          }
        >
          <FFlexWrapper>
            <HiChevronLeft
              className={`${isCollapse && "-rotate-180 transform"}`}
              size={25}
            />
            <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>Collapse</span>
          </FFlexWrapper>
        </div>
      </div>
    </div>
  )
}
export default SideBar

{/* {authority.includes("ADMIN_AUTHORITY") && (
              <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/distribution"}>
                <AiOutlineSchedule style={{ minWidth: "15px" }} size={25} />
                <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                  توزيع المكالمات
                </span>
              </FNavLink>
            )} */}