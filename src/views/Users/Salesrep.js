import FAvatar from '../../components/FAvatar'
import logo from '../../assets/images/logo.jpg'
import { useCustomAxios } from '../../Hooks/useAxios'
import DetailsModal from '../Modals/DetailsModal'
import React, { useState } from 'react'
import InstanceViewer from '../InstanceViewer'

import SectionTitle from '../../components/SectionTitle'
import DataTableFilter from '../DataTableFilter'
import ESpinnerBig from '../../components/ESpinnerBig'
import { getColor, getNotifications, getPerformance } from '../../Utilities/Performance'
import { getMerchantsColumns } from '../../Utilities/ColumnsDefinition'
import Notifications from '../Modals/Notifications'

import { ToastContainer } from 'react-toastify'
import GiveFeedback from '../Modals/GiveFeedback'

const Salesrep = () => {
  // eslint-disable-next-line no-unused-vars
  const [merchantData, setMerchantData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isComplainModalOpen, setIsComplainModalOpen] = useState(false)

  let [notifications, setNotifications] = useState([])
  let [isNotificationsOpen, SetIsNotificationsOpen] = useState(false)

  const { loading, response } = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem('username')}/merchants`,
    },
    localStorage.getItem('username') +
      '+merchants+' +
      new Date().toLocaleDateString(),
  )

  const salesRepMerchantsCountResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem('username')}/merchantsNumber`,
    },
    localStorage.getItem('username') +
      '+merchantsNumber+' +
      new Date().toLocaleDateString(),
  )

  const salesRepTargetAchievedResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem('username')}/targetAchieved`,
    },
    localStorage.getItem('username') +
      '+targetAchieved+' +
      new Date().toLocaleDateString(),
  )

  const salesRepPerformanceResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem('username')}/performance`,
    },
    localStorage.getItem('username') +
      '+performance+' +
      new Date().toLocaleDateString(),
  )

  const salesRepMerchantsClassesResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem('username')}/merchantsClasses`,
    },
    localStorage.getItem('username') +
      '+merchantsClasses+' +
      new Date().toLocaleDateString(),
  )

  const salesRepMerchantsLicenseSummaryResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem(
        'username',
      )}/merchantsLicenseSummary`,
    },
    localStorage.getItem('username') +
      '+merchantsLicenseSummary+' +
      new Date().toLocaleDateString(),
  )

  const salesRepMerchantsClosingBalanceSummaryResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem(
        'username',
      )}/merchantsClosingBalanceSummary`,
    },
    localStorage.getItem('username') +
      '+merchantsClosingBalanceSummary+' +
      new Date().toLocaleDateString(),
  )

  const salesRepMerchantsIncreasingCountsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `salesrep/${localStorage.getItem(
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

  const cols = getMerchantsColumns()
  
  const handleGetNotifications = () => {
    getNotifications(notifications, setNotifications, SetIsNotificationsOpen)
  }

  if (loading) {
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
        {/* <FModal
          title={'الموقع'}
          isOpen={isLocationModalOpen}
          setIsOpen={setIsLocationModalOpen}>
          <div>
            <div className={'flex gap-2   w-full '}>
              <div className={'w-full'}>
                <div
                  className={
                    'primary-shadow rounded border bg-white p-3 h-full pb-10'
                  }>
                  <div className={'my-2'}>
                    <span className={'text-lg font-semibold'}>الموقع </span>
                  </div>
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                    width="100%"
                    height="300px"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                  />
                </div>
              </div>
            </div>
            <FButton
              onClick={() => setIsLocationModalOpen(false)}
              className={'mt-5'}>
              إغلاق
            </FButton>
          </div>
        </FModal> */}
        <GiveFeedback
          isOpen={isComplainModalOpen}
          setIsOpen={setIsComplainModalOpen}
        />
        <DetailsModal
          merchantData={merchantData}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
        <Notifications
          notifications={notifications}
          isOpen={isNotificationsOpen}
          setIsOpen={SetIsNotificationsOpen}
        />
        <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
          <div className={'p-5 w-full'}>
            <div
              className={
                'flex w-full  justify-between gap-2 p-3 gap-5  items-start bg-white border primary-shadow rounded mt-5 '
              }>
              <div className={'flex gap-2 items-center '}>
                <FAvatar name={'mostafa.elamrawiy'} />
                <div className={'flex flex-col '}>
                  <span className={'text-lg'}>
                    {localStorage.getItem('username')}
                  </span>
                  <div className={'flex gap-2'}>
                    <InstanceViewer
                      value={salesRepMerchantsCountResponse?.response}
                      instance={'Merchants'}
                    />
                  </div>
                  <div
                    className={'flex gap-2'}
                    style={{
                      backgroundColor: getColor(
                        salesRepPerformanceResponse?.response,
                      ),
                    }}>
                    <InstanceViewer
                      value={getPerformance(
                        salesRepPerformanceResponse?.response,
                      )}
                      instance={'الاداء'}
                    />
                  </div>

                  <div className={'flex gap-2'}>
                    <InstanceViewer
                      value={
                        salesRepMerchantsIncreasingCountsResponse?.response
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
                </div>
              </div>
              {salesRepTargetAchievedResponse.response.map((item, index) => {
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
              {salesRepMerchantsClassesResponse.response.map((item, index) => {
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
              {salesRepMerchantsLicenseSummaryResponse.response.map(
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
              {salesRepMerchantsClosingBalanceSummaryResponse.response.map(
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
          <div className={'w-full px-4'}>
            <SectionTitle title={'التجار'} />
          </div>
          <DataTableFilter
            data={response}
            columns={cols}
            onRowClick={(row) => {
              setIsModalOpen(true)
              setMerchantData(row)
            }}
          />

          <div
            className={
              'bg-orient-500 p-3 f-col-center mt-auto w-full text-white'
            }>
            <img src={logo} width={80} />
          </div>
        </div>
      </>
    )
  }
}

export default Salesrep
