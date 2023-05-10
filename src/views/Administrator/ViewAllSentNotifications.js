import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SideBar from '../../components/Layout/SideBar'
import { useCustomAxios } from '../../Hooks/useAxios'
import SectionTitle from '../../components/SectionTitle'
import DataTableFilter from '../DataTableFilter'
import { BASE_URL } from '../../env'
import axios from 'axios'
import FileSaver from 'file-saver'
import fromByteArrayToExcel from '../../Utilities/ToExcelConvertor'
import FButton from '../../components/FButton'
import ESpinner from '../../components/ESpinner'
import { toast } from 'react-toastify'

const ViewAllSentNotifications = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [isLoading, SetIsLoading] = useState(false)

  useState(false)

  const notificationsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/admin/getAllNotifications`,
    },
    "Notifications+" + new Date().toLocaleDateString(),
  )

  const columns = React.useMemo(() => [
    {
      Header: 'الرقم التعريفي',
      accessor: 'id', // String-based value accessors!
    },
    {
      Header: 'الرسالة',
      accessor: 'message', // String-based value accessors!
    },
    {
      Header: 'التاريخ',
      accessor: 'creationDate', // String-based value accessors!
    },
    {
      Header: 'تنزيل ملف من قرأ الرسالة',
      accessor: 'button',
      Cell: ({ cell }) => (
        <FButton value={cell.row.values.button} onClick={() => downloadReadExcel(cell.row.values)}>
          <ESpinner isVisible={isLoading} />
          تنزيل
        </FButton>
      ),
    },
  ])

  const downloadReadExcel = (info) =>{
    SetIsLoading(true)
    axios
      .get(`${BASE_URL}admin/` + info.id + '/exportNotificationSeen', {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsLoading(false)

        FileSaver.saveAs(fromByteArrayToExcel(result, 'Notification_Seen_' + info.id))
      })
      .catch((err) => {
        SetIsLoading(false)
        if (err.response?.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  return (
    <>
      <div
        style={{ backgroundColor: 'rgb(247 253 255)' }}
        className="flex max-h-screen min-h-screen w-full flex-grow flex-col bg-orient-500   sm:flex-row">
        {isSideBarOpen && (
          <div
            className={'sidebar-overlay absolute z-20 h-screen w-screen'}></div>
        )}

        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          onClickOutside={() => setIsSideBarOpen(false)}
        />

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={'colored'}
        />
        <div className={'p-5  w-full'}>
          <SectionTitle title={'Notifications'} />
          <DataTableFilter columns={columns} data={notificationsResponse.response} />
        </div>
      </div>
    </>
  )
}

export default ViewAllSentNotifications
