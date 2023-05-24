import { useState } from 'react'
import FButton from '../../components/FButton'
import SideBar from '../../components/Layout/SideBar'
import {ToastContainer } from 'react-toastify'
import FIconWrapper from '../../components/FIconWrapper'
import ESpinner from '../../components/ESpinner'
import { importExcel } from '../../Utilities/ExcelUtil'


const DownloadData = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const [isDownloadUsersLoading, SetIsDownloadUsersLoading] = useState(false)
  const [isDownloadAccountStatusLoading, SetIsDownloadAccountStatusLoading] = useState(false)

  
  const exportAllUsers = () => {
    importExcel('admin/exportAllUsers', SetIsDownloadUsersLoading, 'System_Users')
  }

  const exportAllAccountStatus = () => {
    importExcel('admin/exportAllAccountStatus', SetIsDownloadAccountStatusLoading, 'Account_Status')
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
