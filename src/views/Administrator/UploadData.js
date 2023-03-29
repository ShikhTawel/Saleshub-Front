import { useState } from 'react'
import SideBar from '../../components/Layout/SideBar'

const UploadData = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

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
      </div>
    </>
  )
}

export default UploadData
