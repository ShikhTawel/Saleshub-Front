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
    SetIsUsersLoading(true)
    const multipartFile = new FormData()

    multipartFile.append('multipartFile', selectedFile)

    let headers = {
      Authorization: localStorage.getItem(`access_token`),
    }

    fetch(BASE_URL + 'admin/uploadUsers', {
      method: 'POST',
      body: multipartFile,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        SetIsUsersLoading(false)
        toast.info(result.message)
      })
      .catch((err) => {
        SetIsUsersLoading(false)

        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  const postFileRequestTarget = () => {
    SetIsLoading(true)

    const multipartFile = new FormData()

    multipartFile.append('multipartFile', selectedFileTarget)

    let headers = {
      Authorization: localStorage.getItem(`access_token`),
    }

    fetch(BASE_URL + 'admin/uploadTarget', {
      method: 'POST',
      body: multipartFile,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        SetIsLoading(false)
        toast.info(result.message)
      })
      .catch((err) => {
        SetIsLoading(false)
        if (err.response.data?.errors != null) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  const postFileRequestHr = () => {
    SetIsHrLoading(true)
    const multipartFile = new FormData()

    multipartFile.append('multipartFile', selectedFileHr)

    let headers = {
      Authorization: localStorage.getItem(`access_token`),
    }

    fetch(BASE_URL + 'admin/upload-HR-ID', {
      method: 'POST',
      body: multipartFile,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        SetIsHrLoading(false)
        toast.info(result.message)
      })
      .catch((err) => {
        SetIsHrLoading(false)

        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  const exportSampleHr= () => {
    SetIsHrSampleLoading(true)

    axios
      .get(`${BASE_URL}admin/export-HR-ID`, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsHrSampleLoading(false)
        FileSaver.saveAs(fromByteArrayToExcel(result, 'MainAccount_HR-Sample'))
      })
      .catch((err) => {
        SetIsHrSampleLoading(false)

        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }


  const exportSampleTarget = () => {
    SetIsTargetSampleLoading(true)

    axios
      .get(`${BASE_URL}admin/exportSampleTarget`, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsTargetSampleLoading(false)
        FileSaver.saveAs(fromByteArrayToExcel(result, 'Target-Sample'))
      })
      .catch((err) => {
        SetIsTargetSampleLoading(false)

        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  const exportSampleUser = () => {
    SetIsUserSampleLoading(true)

    axios
      .get(`${BASE_URL}admin/exportSampleUsers`, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsUserSampleLoading(false)
        FileSaver.saveAs(fromByteArrayToExcel(result, 'Users-Sample'))
      })
      .catch((err) => {
        SetIsUserSampleLoading(false)

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

  const postFileRequestMerchantsTarget = () => {
    SetIsMerchantsTargetLoading(true)

    const multipartFile = new FormData()

    multipartFile.append('multipartFile', selectedFileMerchantsTarget)

    let headers = {
      Authorization: localStorage.getItem(`access_token`),
    }

    fetch(BASE_URL + 'admin/uploadMerchantsTarget', {
      method: 'POST',
      body: multipartFile,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        SetIsMerchantsTargetLoading(false)
        toast.info(result.message)
      })
      .catch((err) => {
        SetIsMerchantsTargetLoading(false)
        if (err.response.data?.errors != null) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  const exportSampleMerchantsTarget = () => {
    SetIsMerchantsTargetSampleLoading(true)

    axios
      .get(`${BASE_URL}admin/exportSampleMerchantsTarget`, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsMerchantsTargetSampleLoading(false)
        FileSaver.saveAs(
          fromByteArrayToExcel(result, 'Merhcants_Increase_Target_Sample'),
        )
      })
      .catch((err) => {
        SetIsMerchantsTargetSampleLoading(false)

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
