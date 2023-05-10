import FModal from '../components/FModal'
import FButton from '../components/FButton'
import { useEffect } from 'react'
import { getNotificationsCols } from '../Utilities/ColumnsDefinition'
import DataTableFilter from './DataTableFilter'

const Notifications = ({ isOpen, setIsOpen, notifications }) => {
  useEffect(() => {}, [notifications])

  const cols = getNotificationsCols()

  return (
    <>
      <FModal
        isAutoWidth
        title="الرسائل"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        callbackFunction={() => {window.location.reload()}}>
        <div>
          <div className={'flex gap-2  items-center justify-center w-full '}>
            <div className={'w-full'}>
              <DataTableFilter columns={cols} data={notifications} />
            </div>
          </div>
        </div>
        <div>
          <FButton
            onClick={() => {
              setIsOpen(false)
              window.location.reload()
            }}
            className="w-full mt-4">
            اغلاق
          </FButton>
        </div>
      </FModal>
    </>
  )
}
export default Notifications
