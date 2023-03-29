import { useState } from 'react'
import FButton from '../../components/FButton'
import SideBar from '../../components/Layout/SideBar'
import { BASE_URL } from '../../env'
import {
  postFileRequestTarget,
} from '../../Utilities/PostFile'

const UploadData = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState()

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const postFileRequestUsers = () => {
    const multipartFile = new FormData()

    multipartFile.append('multipartFile', selectedFile)

    let headers = {
      Authorization: localStorage.getItem(`access_token`),
    }

    fetch(
      BASE_URL + 'admin/uploadUsers',
      {
        method: 'POST',
        body: multipartFile,
        headers: headers
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
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

        <div
          className={
            'flex flex-col  items-center justify-center w-full h-screen'
          }>
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            Upload Targets
          </span>
          <input type="file" name="fileTarget" />

          <div>
            <FButton onClick={postFileRequestTarget}>Submit</FButton>
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
            <FButton onClick={postFileRequestUsers}>Submit</FButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadData
