import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { IoClose } from "react-icons/io5"
import PropTypes from "prop-types"

const FModal = ({
  isOpen,
  isAutoWidth,
  setIsOpen,
  title,
  isDismissible,
  callbackFunction,
  children,
  disableBodyPadding,
  color,
}) => {
  function closeModal() {
    console.log(">>>")
    isDismissible && setIsOpen(false)
    console.log("callbackFunction", callbackFunction)
    callbackFunction && callbackFunction()
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className={"fixed inset-0 z-40 h-full w-full  bg-gray-600 bg-opacity-70"}
          ></div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-50 overflow-y-auto"
              onClose={closeModal}
            >
              <div className="min-h-screen px-4 text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                ></span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div
                    className={`z-40 my-8 inline-block transform rounded-md border ${
                      color ? color : "bg-white"
                    }   text-left align-middle shadow-xl transition-all ${
                      !isAutoWidth && "lg:w-6/12"
                    } `}
                  >
                    <>
                      <div className={"mb-7 flex justify-between px-6 pt-6"}>
                        <span className="text-lg font-medium leading-8 text-gray-900">
                          {title}
                        </span>
                        {isDismissible && (
                          <button
                            type="button"
                            className={`
                            flex inline-flex w-8 w-8 flex-col items-center  justify-center justify-center rounded  border border-transparent bg-gray-200 text-sm font-medium leading-none text-gray-500 hover:bg-gray-500 hover:text-gray-100  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                          `}
                            onClick={closeModal}
                          >
                            <IoClose size={20} />
                          </button>
                        )}
                      </div>
                      <div className={`mt-2 ${!disableBodyPadding && "px-6 pb-6"}`}>
                        {children}
                      </div>
                    </>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        ""
      )}
    </>
  )
}
FModal.defaultProps = {
  isDismissible: true,
}

FModal.propTypes = {
  isDismissible: PropTypes.bool,
}
export default FModal
