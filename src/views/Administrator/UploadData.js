import { useState } from 'react'
import FButton from '../../components/FButton'
import SideBar from '../../components/Layout/SideBar'
import { ToastContainer } from 'react-toastify'
import FIconWrapper from '../../components/FIconWrapper'
import ESpinner from '../../components/ESpinner'
import { exportExcel, importExcel } from '../../Utilities/ExcelUtil'

const UploadData = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const [isLoading, SetIsLoading] = useState(false)
  const [isUsersLoading, SetIsUsersLoading] = useState(false)
  const [isHrLoading, SetIsHrLoading] = useState(false)

  const [isMerchantsTargetLoading, SetIsMerchantsTargetLoading] =
    useState(false)

  const [isTargetSampleLoading, SetIsTargetSampleLoading] = useState(false)
  const [isMerchantsTargetSampleLoading, SetIsMerchantsTargetSampleLoading] =
    useState(false)
  const [isUserSampleLoading, SetIsUserSampleLoading] = useState(false)
  const [isHrSampleLoading, SetIsHrSampleLoading] = useState(false)

  const [selectedFile, setSelectedFile] = useState()
  const [selectedFileHr, setSelectedFileHr] = useState()

  const [selectedFileTarget, setSelectedFileTarget] = useState()
  const [selectedFileMerchantsTarget, setSelectedFileMerchantsTarget] =
    useState()

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const changeHrHandler = (event) => {
    setSelectedFileHr(event.target.files[0])
  }

  const changeHandlerTarget = (event) => {
    setSelectedFileTarget(event.target.files[0])
  }

  const changeHandlerMrechantsTarget = (event) => {
    setSelectedFileMerchantsTarget(event.target.files[0])
  }

  const postFileRequestUsers = () => {
    exportExcel('admin/uploadUsers',SetIsUsersLoading , selectedFile)
  }

  const postFileRequestTarget = () => {
    exportExcel('admin/uploadTarget',SetIsLoading , selectedFileTarget)
  }

  const postFileRequestHr = () => {
    exportExcel('admin/upload-HR-ID',SetIsHrLoading , selectedFileHr)
  }

  const postFileRequestMerchantsTarget = () => {
    exportExcel('admin/uploadMerchantsTarget',SetIsMerchantsTargetLoading , selectedFileMerchantsTarget)
  }

  const exportSampleHr = () => {
    importExcel('admin/export-HR-ID', SetIsHrSampleLoading, 'MainAccount_HR-Sample')
  }


  const exportSampleTarget = () => {
    importExcel('admin/exportSampleTarget', SetIsTargetSampleLoading, 'Target-Sample')
  }

  const exportSampleUser = () => {
    importExcel('admin/exportSampleUsers', SetIsUserSampleLoading, 'Users-Sample')
  }

  const exportSampleMerchantsTarget = () => {
    importExcel('admin/exportSampleMerchantsTarget', SetIsMerchantsTargetSampleLoading, 'Merhcants_Increase_Target_Sample')
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
            رفع تارجتس المبيعات
          </span>
          <br />
          <input type="file" name="fileTarget" onChange={changeHandlerTarget} />

          <div>
            <FButton onClick={postFileRequestTarget}>
              <FIconWrapper>
                <ESpinner isVisible={isLoading} />
                <span className={'text-s'}>Submit</span>
              </FIconWrapper>
            </FButton>
          </div>
          <FButton onClick={exportSampleTarget}>
            <FIconWrapper>
              <ESpinner isVisible={isTargetSampleLoading} />
              <span className={'text-s'}>تحميل عينة من ملف التارجتس</span>
            </FIconWrapper>
          </FButton>
        </div>
        <div
          className={
            'flex flex-col  items-center justify-center w-full h-screen'
          }>
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            رفع تارجتس زيادة التجار
          </span>
          <br />
          <input
            type="file"
            name="fileTargetMerchants"
            onChange={changeHandlerMrechantsTarget}
          />

          <div>
            <FButton onClick={postFileRequestMerchantsTarget}>
              <FIconWrapper>
                <ESpinner isVisible={isMerchantsTargetLoading} />
                <span className={'text-s'}>Submit</span>
              </FIconWrapper>
            </FButton>
          </div>
          <FButton onClick={exportSampleMerchantsTarget}>
            <FIconWrapper>
              <ESpinner isVisible={isMerchantsTargetSampleLoading} />
              <span className={'text-s'}>تحميل عينة من ملف تارجتس التجار</span>
            </FIconWrapper>
          </FButton>
        </div>
        <div
          className={
            'flex flex-col  items-center justify-center w-full h-screen'
          }>
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            رفع مستخدمين جدد
          </span>
          <br />
          <input type="file" name="fileUsers" onChange={changeHandler} />

          <div>
            <FButton onClick={postFileRequestUsers}>
              <FIconWrapper>
                <ESpinner isVisible={isUsersLoading} />
                <span className={'text-s'}>Submit</span>
              </FIconWrapper>
            </FButton>
          </div>
          <FButton onClick={exportSampleUser}>
            <FIconWrapper>
              <ESpinner isVisible={isUserSampleLoading} />
              <span className={'text-s'}>تحميل عينة من ملف المستخدمين</span>
            </FIconWrapper>
          </FButton>
        </div>

        <div
          className={
            'flex flex-col  items-center justify-center w-full h-screen'
          }>
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            رفع الرقم التعريفي الخاص بالاتش ار
          </span>
          <br />
          <input type="file" name="fileHr" onChange={changeHrHandler} />

          <div>
            <FButton onClick={postFileRequestHr}>
              <FIconWrapper>
                <ESpinner isVisible={isHrLoading} />
                <span className={'text-s'}>Submit</span>
              </FIconWrapper>
            </FButton>
          </div>
          <FButton onClick={exportSampleHr}>
            <FIconWrapper>
              <ESpinner isVisible={isHrSampleLoading} />
              <span className={'text-s'}>تحميل عينة من ملف الاتش ار</span>
            </FIconWrapper>
          </FButton>
        </div>
      </div>
    </>
  )
}

export default UploadData
