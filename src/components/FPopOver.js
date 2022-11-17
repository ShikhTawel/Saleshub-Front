import { Popover } from "@headlessui/react"
import FInputField from "./FInputField"
import FLabel from "./FLabel"
import EFormWrapper from "./EFormWrapper"
import FButton from "./FButton"
import { axiosInstance } from "../api/requister"
import { useState } from "react"
import ESpinner from "./ESpinner"
import FIconWrapper from "./FIconWrapper"
import { toast } from "react-toastify"

const FPopOver = ({ button, callId, callBack }) => {
  const [scheduleDate, setScheduleDate] = useState("")
  const [isScheduleRequestLoading, setIsScheduleRequestLoading] = useState(false)
  const handleRescheduleCall = (callId, close) => {
    setIsScheduleRequestLoading(true)
    axiosInstance
      .post(`call/${callId}/reschedule`, {
        scheduledTo: scheduleDate,
      })
      .then((res) => {
        setIsScheduleRequestLoading(false)
        console.log(res)
        callBack()
        close()
        toast.success("تم تحديد موعد جديد للمكالمة")
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        setIsScheduleRequestLoading(false)
        console.log(err)
      })
  }
  return (
    <Popover className="relative">
      <Popover.Button>{button}</Popover.Button>
      <Popover.Panel className="absolute left-0 top-10 z-10  w-screen max-w-sm rounded border bg-white shadow-lg ">
        {({ close }) => (
          <div className="flex flex-col gap-2">
            <div className={"border-b p-3"}>
              <span className="block whitespace-nowrap text-right text-sm text-gray-700">
                تغير موعد المكالمة
              </span>
            </div>
            <div className={"flex flex-col px-3 pb-3"}>
              <EFormWrapper className={"w-full"}>
                <FLabel>موعد المكالمة</FLabel>
                <FInputField
                  type={"dateTime-local"}
                  min={new Date().toISOString().split("T")[0]}
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </EFormWrapper>
              <FButton onClick={() => handleRescheduleCall(callId, close)}>
                <FIconWrapper>
                  <ESpinner isVisible={isScheduleRequestLoading} />
                  حفظ
                </FIconWrapper>
              </FButton>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  )
}
export default FPopOver
