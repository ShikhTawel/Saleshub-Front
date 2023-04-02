import { useState } from 'react'
import FButton from '../../components/FButton'
import SideBar from '../../components/Layout/SideBar'
import { BASE_URL } from '../../env'
import { toast, ToastContainer } from 'react-toastify'
import FIconWrapper from '../../components/FIconWrapper'
import ESpinner from '../../components/ESpinner'

const UploadData = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [isLoading, SetIsLoading] = useState(false)
  
  const [isUsersLoading, SetIsUsersLoading] = useState(false)

  const [selectedFile, setSelectedFile] = useState()
  const [selectedFileTarget, setSelectedFileTarget] = useState()

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const changeHandlerTarget = (event) => {
    setSelectedFileTarget(event.target.files[0])
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
        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
  }

  if (!localStorage.getItem('access_token')) window.location.href = '/'

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
            Upload Targets
          </span>
          <input type="file" name="fileTarget" onChange={changeHandlerTarget} />

          <div>
            <FButton onClick={postFileRequestTarget}>
              <FIconWrapper>
                <ESpinner isVisible={isLoading} />
                <span className={'text-s'}>Submit</span>
              </FIconWrapper>
            </FButton>
          </div>
        </div>
        <div
          className={
            'flex flex-col  items-center justify-center w-full h-screen'
          }>
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            Upload New Users
          </span>
          <input type="file" name="fileUsers" onChange={changeHandler} />

          <div>
            <FButton onClick={postFileRequestUsers}>
              <FIconWrapper>
                <ESpinner isVisible={isUsersLoading} />
                <span className={'text-s'}>Submit</span>
              </FIconWrapper>
            </FButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadData
