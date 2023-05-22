import { useCustomAxios } from '../../Hooks/useAxios'
import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import logo from '../../assets/images/logo.jpg'
import DataTableFilter from '../DataTableFilter'
import ESpinnerBig from '../../components/ESpinnerBig'
import InstanceViewer from '../InstanceViewer'
import DetailsModalRep from '../Modals/DetailsModalRep'
import {
  getColor,
  getNotifications,
  getPerformance,
} from '../../Utilities/Performance'
import { getRepsColumns } from '../../Utilities/ColumnsDefinition'
import GiveFeedback from '../Modals/GiveFeedback'
import { ToastContainer } from 'react-toastify'
import Notifications from '../Modals/Notifications'

// import Dropdown from './Dropdown'

// const menu = ['mohamed.hm.mahmoud', 'mahmoud.hadad', 'baher.shehata']

const Manager = () => {
  const [repData, setRepData] = useState('')
  const [isRepModalOpen, setIsRepModalOpen] = useState(false)
  const [isComplainModalOpen, setIsComplainModalOpen] = useState(false)

  let [notifications, setNotifications] = useState([])
  let [isNotificationsOpen, SetIsNotificationsOpen] = useState(false)

  const managerPerformanceResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem('username')}/performance`,
    },
    localStorage.getItem('username') +
      '+performance+' +
      new Date().toLocaleDateString(),
  )

  const { loading, response } = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem('username')}/reps`,
    },
    localStorage.getItem('username') +
      '+reps+' +
      new Date().toLocaleDateString(),
  )
  const supervisorsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem('username')}/supervisors`,
    },
    localStorage.getItem('username') +
      '+supervisors+' +
      new Date().toLocaleDateString(),
  )

  const managerTargetAchievedResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem('username')}/targetAchieved`,
    },
    localStorage.getItem('username') +
      '+targetAchieved+' +
      new Date().toLocaleDateString(),
  )

  const managerMerchantsCountResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem('username')}/merchantsNumber`,
    },
    localStorage.getItem('username') +
      '+merchantsNumber+' +
      new Date().toLocaleDateString(),
  )

  const managerMerchantsClassesResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem('username')}/merchantsClasses`,
    },
    localStorage.getItem('username') +
      '+merchantsClasses+' +
      new Date().toLocaleDateString(),
  )

  const managerMerchantsLicenseSummaryResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem(
        'username',
      )}/merchantsLicenseSummary`,
    },
    localStorage.getItem('username') +
      '+merchantsLicenseSummary+' +
      new Date().toLocaleDateString(),
  )

  const managerMerchantsClosingBalanceSummaryResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem(
        'username',
      )}/merchantsClosingBalanceSummary`,
    },
    localStorage.getItem('username') +
      '+merchantsClosingBalanceSummary+' +
      new Date().toLocaleDateString(),
  )

  const managerMerchantsIncreasingCountsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/manager/${localStorage.getItem(
        'username',
      )}/merchantsIncreasingCounts`,
    },
    localStorage.getItem('username') +
      '+merchantsIncreasingCounts+' +
      new Date().toLocaleDateString(),
  )

  const lastTargetUploadDate = useCustomAxios(
    {
      method: 'GET',
      url: `targetUploadDate`,
    },
    'targetUploadDate',
  )

  const cols = getRepsColumns()

  const handleGetNotifications = () => {
    getNotifications(notifications, setNotifications, SetIsNotificationsOpen)
  }

  if (
    loading ||
    supervisorsResponse.loading ||
    managerTargetAchievedResponse.loading ||
    managerMerchantsCountResponse.loading
  ) {
    return (
      <>
        <span>
          <ESpinnerBig isVisible={true} />
        </span>
      </>
    )
  } else {
    return (
      <>
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
        <div className={'p-5'}>
          <div className={'p-5 w-full'}>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex gap-2 items-center '}>
                <div className={'flex flex-col '}>
                  <span className={'text-lg'}>
                    <div
                      className={'border primary-shadow p-1 bg-white rounded'}>
                      <span className={'text-2xl font-bold'}>المدير: </span>
                      <span className={'text-2xl font-bold'}>
                        {localStorage.getItem('username')}
                      </span>
                    </div>
                    <div className={'flex gap-2'}>
                      <InstanceViewer
                        value={managerMerchantsCountResponse?.response}
                        instance={'POS'}
                      />
                    </div>
                    <div
                      className={'flex gap-2'}
                      style={{
                        backgroundColor: getColor(
                          managerPerformanceResponse?.response,
                        ),
                      }}>
                      <InstanceViewer
                        value={getPerformance(
                          managerPerformanceResponse?.response,
                        )}
                        instance={'الاداء'}
                      />
                    </div>
                    <div className={'flex gap-2'}>
                      <InstanceViewer
                        value={
                          managerMerchantsIncreasingCountsResponse?.response
                        }
                        instance={'زيادة عدد التجار'}
                      />
                    </div>
                    <div className={'flex gap-2'}>
                      <InstanceViewer
                        value={lastTargetUploadDate?.response}
                        instance={'تاريخ اضافة التارجت'}
                      />
                    </div>
                    <span
                      onClick={() => {
                        setIsComplainModalOpen(true)
                      }}
                      className={
                        'font-medium underline text-orient-600 cursor-pointer'
                      }>
                      تقديم شكوى او مقترح
                    </span>
                    <br />  
                    <span
                      onClick={() => handleGetNotifications()}
                      className={
                        'font-medium underline text-orient-600 cursor-pointer'
                      }>
                      عرض جميع الرسائل المسبقة
                    </span>
                  </span>
                </div>
              </div>
              {managerTargetAchievedResponse.response.map((item, index) => {
                return (
                  <div
                    style={{
                      direction: 'ltr',
                    }}
                    key={index}
                    className={'flex flex-col gap-2 items-start '}>
                    <span className={'text-lg'}>{item?.serviceName}</span>
                    <div
                      className={
                        'flex flex-col gap-1 divide-y border rounded bg-gray-100 border-dashed  '
                      }>
                      <p className={'text-left px-1'}>
                        Target {item?.targetFormmated}
                      </p>{' '}
                      <p className={'text-left px-1'}>
                        Achieved {item?.achievedWithPercentage}
                      </p>{' '}
                      <p className={'text-left px-1'}>
                        Expected Achieved {item?.expectedWithPercentage}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={'p-5 w-full'}>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex flex-col '}>
                <span className={'text-lg'}>فئات التجار</span>
              </div>
              {managerMerchantsClassesResponse.response.map((item, index) => {
                return (
                  <div
                    style={{
                      direction: 'ltr',
                    }}
                    key={index}
                    className={'flex flex-col gap-2 items-start '}>
                    <span className={'text-lg'}>{item?.classType}</span>
                    <div
                      className={
                        'flex flex-col gap-1 divide-y border rounded bg-gray-100 border-dashed  '
                      }>
                      <p className={'text-left px-1'}>Count {item?.count}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex flex-col '}>
                <span className={'text-lg'}>الرخص</span>
              </div>
              {managerMerchantsLicenseSummaryResponse.response.map(
                (item, index) => {
                  return (
                    <div
                      style={{
                        direction: 'ltr',
                      }}
                      key={index}
                      className={'flex flex-col gap-2 items-start '}>
                      <span className={'text-lg'}>{item?.license}</span>
                      <div
                        className={
                          'flex flex-col gap-1 divide-y border rounded bg-gray-100 border-dashed  '
                        }>
                        <p className={'text-left px-1'}>Count {item?.count}</p>
                      </div>
                    </div>
                  )
                },
              )}
            </div>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex flex-col '}>
                <span className={'text-lg'}>Closing Balance</span>
              </div>
              {managerMerchantsClosingBalanceSummaryResponse.response.map(
                (item, index) => {
                  return (
                    <div
                      style={{
                        direction: 'ltr',
                      }}
                      key={index}
                      className={'flex flex-col gap-2 items-start '}>
                      <span className={'text-lg'}>{item?.range}</span>
                      <div
                        className={
                          'flex flex-col gap-1 divide-y border rounded bg-gray-100 border-dashed  '
                        }>
                        <p className={'text-left px-1'}>Count {item?.count}</p>
                      </div>
                    </div>
                  )
                },
              )}
            </div>
          </div>
          <SectionTitle title={'المشرفين'} />
          <DataTableFilter
            columns={cols}
            data={supervisorsResponse.response}
            onRowClick={(row) => {
              localStorage.setItem('username', row.name.toLowerCase())
              localStorage.setItem('role', 'Supervisor')
              window.location.reload()
            }}
          />
          <GiveFeedback
            isOpen={isComplainModalOpen}
            setIsOpen={setIsComplainModalOpen}
          />
          <DetailsModalRep
            repData={repData}
            isOpen={isRepModalOpen}
            setIsOpen={setIsRepModalOpen}
          />
          <Notifications
            notifications={notifications}
            isOpen={isNotificationsOpen}
            setIsOpen={SetIsNotificationsOpen}
          />
          <SectionTitle title={'المناديب'} />
          <DataTableFilter
            columns={cols}
            data={response}
            onRowClick={(row) => {
              setIsRepModalOpen(true)
              setRepData(row)
            }}
          />
          {/* <div
            className={
              'flex w-full  justify-center gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
            }>
            <Dropdown placeHolder={'المناديب'} menu={menu}/>
          </div> */}
        </div>

        <div
          className={
            'bg-orient-500 p-3 f-col-center mt-auto w-full text-white'
          }>
          <img src={logo} width={80} />
        </div>
      </>
    )
  }
}

export default Manager
