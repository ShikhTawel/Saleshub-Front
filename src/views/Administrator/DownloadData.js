import { useState } from 'react'
import FButton from '../../components/FButton'
import SideBar from '../../components/Layout/SideBar'
import { BASE_URL } from '../../env'
import { toast, ToastContainer } from 'react-toastify'
import FIconWrapper from '../../components/FIconWrapper'
import ESpinner from '../../components/ESpinner'
import fromByteArrayToExcel from '../../Utilities/ToExcelConvertor'
import * as FileSaver from 'file-saver'
import axios from 'axios'

const DownloadData = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const [isDownloadUsersLoading, SetIsDownloadUsersLoading] = useState(false)
  const [isDownloadAccountStatusLoading, SetIsDownloadAccountStatusLoading] = useState(false)

  
  const exportAllUsers = () => {
    SetIsDownloadUsersLoading(true)

    axios
      .get(`${BASE_URL}admin/exportAllUsers`, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsDownloadUsersLoading(false)
        FileSaver.saveAs(fromByteArrayToExcel(result, 'System_Users'))
      })
      .catch((err) => {
        SetIsDownloadUsersLoading(false)

        console.log(err)
        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  const exportAllAccountStatus = () => {
    SetIsDownloadAccountStatusLoading(true)

    axios
      .get(`${BASE_URL}admin/exportAllAccountStatus`, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsDownloadAccountStatusLoading(false)
        FileSaver.saveAs(fromByteArrayToExcel(result, 'Account_Status'))
      })
      .catch((err) => {
        SetIsDownloadAccountStatusLoading(false)

        console.log(err)
        if (err.response.data.errors) {
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

        <div
          className={
            'flex flex-col  items-center justify-center w-full h-screen'
          }>
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            تنزيل ملفات الاكسل
          </span>
          <br />

          <FButton onClick={exportAllUsers}>
            <FIconWrapper>
              <ESpinner isVisible={isDownloadUsersLoading} />
              <span className={'text-s'}>تنزيل ملف المستخدمين</span>
            </FIconWrapper>
          </FButton>
          <br />
          <FButton onClick={exportAllAccountStatus}>
            <FIconWrapper>
              <ESpinner isVisible={isDownloadAccountStatusLoading} />
              <span className={'text-s'}>تنزيل ملف حالة المستخدمين</span>
            </FIconWrapper>
          </FButton>
        </div>
      </div>
    </>
  )
}

export default DownloadData
