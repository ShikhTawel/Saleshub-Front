import { TbReportAnalytics, TbSmartHome } from "react-icons/tb"
import {
  HiChevronLeft,
  HiOutlineCog,
  HiOutlineNewspaper,
  HiOutlineUpload,
  HiOutlineUserGroup,
} from "react-icons/hi"
import FFlexWrapper from "../FFlexWrapper"
import { useEffect, useRef, useState } from "react"
import { t } from "i18next"
import FNavLink from "../FNavLink"
import { FaRegUser } from "react-icons/fa"
import { UseLocalStorageContent } from "../../Hooks/useLocalStorageContent"
import useWindowDimensions from "../../Hooks/useWindowDimensions"
import { AiOutlineSchedule } from "react-icons/ai"
import { IoMdRemoveCircleOutline } from "react-icons/io"
import { getRoutePathByName } from "../../helpers/utils"
import { FiHelpCircle } from "react-icons/fi"
import { RiMoneyDollarCircleLine, RiMoneyPoundCircleLine } from "react-icons/ri"

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, onClickOutside }) => {
  const sidebarRef = useRef(null)
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

  const { authority } = UseLocalStorageContent()
  const { width } = useWindowDimensions()

  return (
    <div
      ref={sidebarRef}
      style={
        width < 768
          ? { right: isSideBarOpen ? "0px" : "-250px", position: "absolute" }
          : { position: "relative" }
      }
      className={"z-20 h-screen"}
    >
      <div
        style={isCollapse ? { width: "70px", minWidth: "70px" } : { width: "250px" }}
        className={`${
          !authority.includes("ADMIN_AUTHORITY")
            ? "bg-gray-900"
            : "hidden bg-orient-500"
        }  f-col h-full `}
      >
        <div className={"py-2 px-4"}>
          <div className={"f-col gap-1  "}>
            <div className={"f-col-center-center"}>
              <img
                src={require("../../assets/images/FAWRY-INSURANCE-BROKERAGE_admin.png")}
                width={100}
                alt="logo"
              />
            </div>
            <FNavLink
              setIsSideBarOpen={setIsSideBarOpen}
              to={getRoutePathByName("dashboard")}
            >
              <TbSmartHome style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                {t("dashboard")}
              </span>
            </FNavLink>
            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/"}>
              <TbSmartHome style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                {t("dashboard")}
              </span>
            </FNavLink>
            {authority.includes("ADMIN_AUTHORITY") && (
              <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/distribution"}>
                <AiOutlineSchedule style={{ minWidth: "15px" }} size={25} />
                <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                  توزيع المكالمات
                </span>
              </FNavLink>
            )}
            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/customer"}>
              <FaRegUser size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                العملاء
              </span>
            </FNavLink>

            <FNavLink
              setIsSideBarOpen={setIsSideBarOpen}
              to={getRoutePathByName("subscriptionsList")}
            >
              <RiMoneyDollarCircleLine size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                الأشتراكات
              </span>
            </FNavLink>

            <FNavLink
              setIsSideBarOpen={setIsSideBarOpen}
              to={getRoutePathByName("OracleUpload")}
            >
              <HiOutlineUpload style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                توريد البيانات
              </span>
            </FNavLink>
            {authority.includes("ADMIN_AUTHORITY") && (
              <FNavLink
                setIsSideBarOpen={setIsSideBarOpen}
                to={getRoutePathByName("reports")}
              >
                <TbReportAnalytics style={{ minWidth: "15px" }} size={25} />
                <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                  التقارير
                </span>
              </FNavLink>
            )}

            {authority.includes("ADMIN_AUTHORITY") && (
              <FNavLink
                setIsSideBarOpen={setIsSideBarOpen}
                to={getRoutePathByName("residuals")}
              >
                <RiMoneyPoundCircleLine style={{ minWidth: "15px" }} size={25} />
                <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                  المعلقات
                </span>
              </FNavLink>
            )}

            {authority.includes("ADMIN_AUTHORITY") && (
              <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/agent"}>
                <HiOutlineUserGroup style={{ minWidth: "15px" }} size={25} />
                <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                  فريق العمل{" "}
                </span>
              </FNavLink>
            )}
            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/product"}>
              <HiOutlineNewspaper style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                المنتجات
              </span>
            </FNavLink>
            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/productCancelList"}>
              <IoMdRemoveCircleOutline style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                إلغاء أشتراك المنتجات
              </span>
            </FNavLink>

            <FNavLink
              setIsSideBarOpen={setIsSideBarOpen}
              to={getRoutePathByName("help")}
            >
              <FiHelpCircle style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                المساعدة
              </span>
            </FNavLink>

            <FNavLink setIsSideBarOpen={setIsSideBarOpen} to={"/settings"}>
              <HiOutlineCog style={{ minWidth: "15px" }} size={25} />
              <span className={`text-sm ${isCollapse ? "hidden" : ""}`}>
                {t("settings")}
              </span>
            </FNavLink>
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
