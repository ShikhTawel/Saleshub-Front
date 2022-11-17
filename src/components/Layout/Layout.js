import SideBar from "./SideBar"
import { SITE_LOGO } from "../../env"
import { useLocation } from "react-router-dom"
import FAvatar from "../FAvatar"
import { HiMenu } from "react-icons/hi"
import FMenu from "../FMenu"
import { ToastContainer } from "react-toastify"
import React, { useState } from "react"
import { getAuthorities } from "../../helpers/utils"
import { UseLocalStorageContent } from "../../Hooks/useLocalStorageContent"
import FButton from "../FButton"
import MobileMenu from "./MobileMenu"

const Footer = () => (
  <div
    className={
      "sticky bottom-0 mt-auto hidden items-center justify-between border-t bg-white p-3 lg:flex"
    }
  >
    <span className={"text-xs font-medium text-gray-500"}>V.0.0.1</span>
    <img width={"65"} src={SITE_LOGO} />
    <span className={"text-xs font-medium text-gray-500 "}>Contact us</span>
  </div>
)
const Layout = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false)
  const { pathname } = useLocation()
  const { name } = UseLocalStorageContent()

  const noPaddingRoutes = [
    "/settings",
    "/settings/details",
    "/settings/security",
    "/customers",
    "/customers/details/",
  ]
  const checkNoPaddingRoutes = (route) =>
    noPaddingRoutes.filter((singleRoute) => singleRoute.includes(route)).length === 0
  let [showInfo1, setShowInfo1] = useState(false)

  let isCollapse = false
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div
        style={{ backgroundColor: "rgb(247 253 255)" }}
        className="flex max-h-screen min-h-screen w-full flex-grow flex-col bg-orient-500   sm:flex-row"
      >
        {isSideBarOpen && (
          <div className={"sidebar-overlay absolute z-20 h-screen w-screen"}></div>
        )}

        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          onClickOutside={() => setIsSideBarOpen(false)}
        />
        <main
          role="main"
          className={`flex  max-h-screen min-h-screen w-full flex-col overflow-y-auto ${
            isSideBarOpen && "blur-xs"
          }`}
        >
          {/*<div className={`sidebar-separator ${props.sidebar_status === false ?"hidden":""}`}> </div>*/}
          {/*<Header className={""}/>*/}
          <div className={"flex grow flex-col"}>
            <div
              className={
                "sticky  top-0 z-10 flex flex-row-reverse items-center  justify-between border border-b bg-gray-50 p-3"
              }
            >
              <div className={"flex  gap-2"}>
                <FMenu>
                  <div className={" flex flex-row-reverse  gap-2"}>
                    <FAvatar name={name} />
                    <div>
                      <span
                        className={`block whitespace-nowrap text-left text-sm text-gray-700  ${
                          isCollapse ? "hidden" : ""
                        }`}
                      >
                        {name}
                      </span>
                      <span
                        className={`block text-left text-xs leading-tight text-gray-500  ${
                          isCollapse ? "hidden" : ""
                        }`}
                      >
                        {getAuthorities(
                          JSON.parse(localStorage.getItem("authority"))[0]
                        )}
                      </span>
                    </div>
                  </div>
                </FMenu>
              </div>
              <div className={"bg:block hidden"}>
                {/*<FPopOver
                  button={
                    <div
                      className={
                        "flex h-9 w-9 items-center justify-center rounded-full  border border-orient-700 bg-orient-500 text-white"
                      }
                    >
                      <HiPlusCircle size={20} />
                    </div>
                  }
                />*/}
              </div>
              <FButton
                className={"block lg:hidden"}
                onClick={() => setIsSideBarOpen(true)}
              >
                <HiMenu size={25} />
              </FButton>
            </div>
            <div className={"md:p5 h-full p-0"}>{props.children}</div>
            {/**/}
          </div>
          <Footer />
          <MobileMenu />
        </main>
      </div>
    </>
  )
}
export default Layout
