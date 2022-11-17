import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import FIconWrapper from "./FIconWrapper"
import { HiLogout } from "react-icons/hi"

export default function FMenu({ children, items }) {
  function logout() {
    localStorage.removeItem("access_token")
    window.location.href = "/"
  }
  return (
    <div className="z-50 w-56 text-left">
      <Menu as="div" className="relative z-50 inline-block text-left">
        <div>
          <Menu.Button className=" w-full">{children}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-50 mt-2 origin-top-right divide-gray-100   rounded-md bg-white shadow shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orient-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => logout()}
                  >
                    <FIconWrapper>
                      <HiLogout size={20} />
                      <span className={"whitespace-nowrap"}>تسجيل الخروج</span>
                    </FIconWrapper>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
