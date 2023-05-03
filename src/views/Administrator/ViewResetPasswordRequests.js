import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SideBar from '../../components/Layout/SideBar'
import { useCustomAxios } from '../../Hooks/useAxios'
import { getResetPasswordRequestsCols } from '../../Utilities/ColumnsDefinition'
import SectionTitle from '../../components/SectionTitle'
import DataTableFilter from '../DataTableFilter'

const ViewResetPasswordRequests = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'

  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  useState(false)

  const requestsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/admin/getAllResetPasswordRequests`,
    }
  )

  const columns = getResetPasswordRequestsCols()

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
          <SectionTitle title={'الطلبات'} />
          <DataTableFilter columns={columns} data={requestsResponse.response} />
        </div>
      </div>
    </>
  )
}

export default ViewResetPasswordRequests
