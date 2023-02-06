import FAvatar from '../components/FAvatar'
import logo from '../assets/images/logo.jpg'
import Supervisor from './Supervisor'
import { useCustomAxios } from '../Hooks/useAxios'
import DetailsModal from './DetailsModal'
import React, { useState } from 'react'
import InstanceViewer from './InstanceViewer'
import ESpinner from '../components/ESpinner'
import FModal from '../components/FModal'
import FButton from '../components/FButton'
import SectionTitle from '../components/SectionTitle'
import DataTableFilter from './DataTableFilter'

const Dashboard = () => {
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach((row) => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
      <select
        className={
          'w-full rounded text-gray-800 border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
        }
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}>
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} className={'text-gray-800'} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  function AnotherSelectColumnFilter({ column: { filterValue, setFilter } }) {
    return (
      <select
        className={
          'w-full rounded text-gray-800 border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
        }
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}>
        <option value="">All</option>
        <option value="Bad">Bad</option>
        <option value="Normal">Normal</option>
        <option value="Good">Good</option>
      </select>
    )
  }

  function ovdFilter({ column: { filterValue, setFilter } }) {
    // Render a multi-select box
    return (
      <select
        className={
          'w-full rounded text-gray-800 border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
        }
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}>
        <option value="">All</option>
        <option value="false">Zero</option>
        <option value="true">Value</option>
      </select>
    )
  }

  function logout() {
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    window.location.href = "/"
  }

  //filter function to filter the data if the number greater than 0

  // eslint-disable-next-line no-unused-vars
  const [merchantData, setMerchantData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const { response } = useCustomAxios({
    method: 'GET',
    url: `SalesRep/${localStorage.getItem('username')}/merchants/`,
  })
  const salesRepMerchantsCountResponse = useCustomAxios({
    method: 'GET',
    url: `SalesRep/${localStorage.getItem('username')}/merchantsNumber`,
  })

  const salesRepTargetAchievedResponse = useCustomAxios({
    method: 'GET',
    url: `SalesRep/targetAchieved/${localStorage.getItem('username')}`,
  })

  const cols = [
    {
      Header: 'الكود',
      accessor: 'code', // String-based value accessors!
    },
    {
      Header: 'الأسم',
      accessor: 'name', // String-based value accessors!
    },

    {
      Header: 'Class',
      accessor: 'merchantClass', // String-based value accessors!
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'OVD',
      accessor: 'overdraftLimit', // String-based value accessors!
      Filter: ovdFilter,
      filter: (rows, id, filterValue) => {
        console.log(rows, id, filterValue)
        if (filterValue === 'true') {
          return rows.filter((row) => row.values[id] > 0)
        }
        return rows.filter((row) => row.values[id] === 0)
      },
    },
    {
      Header: 'P1 (Airtime)',
      accessor: 'performanceMonthlyFlagAirtime', // String-based value accessors!
      Cell: (row) => {
        if (row.value == 'Good')
          return (
            <span
              className={
                'text-blue-500  px-3 text-xs font-medium border border-blue-500 rounded-full bg-blue-300'
              }></span>
          )
        else if (row.value == 'Bad')
          return (
            <span
              className={
                'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
              }></span>
          )
        else
          return (
            <span
              className={
                'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
              }></span>
          )
        // return !row.value ? (
        //   <span
        //     className={
        //       'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
        //     }>
        //     {' '}
        //   </span>
        // ) : (
        //   <span
        //     className={
        //       'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
        //     }></span>
        // )
      },
      Filter: AnotherSelectColumnFilter,
    },
    {
      Header: 'P2 (Bills)',
      accessor: 'performanceMonthlyFlagBills', // String-based value accessors!
      Cell: (row) => {
        if (row.value == 'Good')
          return (
            <span
              className={
                'text-blue-500  px-3 text-xs font-medium border border-blue-500 rounded-full bg-blue-300'
              }></span>
          )
        else if (row.value == 'Bad')
          return (
            <span
              className={
                'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
              }></span>
          )
        else
          return (
            <span
              className={
                'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
              }></span>
          )
      },

      Filter: AnotherSelectColumnFilter,
    },
  ]
  if (localStorage.getItem('role') === 'Supervisor') {
    return (
      <>
        <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
          <div className={'bg-orient-500 p-3 f-col-center text-white w-full'}>
            <span>Fawry Merchant System</span>
            <FButton  onClick={() => logout()}>Logout</FButton>
          </div>
          <div className={'w-full'}>
            <Supervisor />
          </div>
        </div>
      </>
    )
  } else {
    if (!salesRepTargetAchievedResponse.loading) {
      return (
        <>
          <FModal
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
          </FModal>
          <DetailsModal
            merchantData={merchantData}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
          <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
            <div className={'bg-orient-500 p-3 f-col-center text-white w-full'}>
              <span>Fawry Merchant System</span>
              <FButton  onClick={() => logout()}>Logout</FButton>
            </div>
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
                    <span
                      onClick={() => {
                        setIsLocationModalOpen(true)
                      }}
                      className={
                        'font-medium underline text-orient-600 cursor-pointer'
                      }>
                      إظهار الموقع
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
                          Target {item?.targetAmount}
                        </p>{' '}
                        <p className={'text-left px-1'}>
                          Achieved {item?.achievedAmount}
                        </p>{' '}
                        <p className={'text-left px-1'}>
                          Expected Achieved {item?.expectedAchieved}
                        </p>
                      </div>
                    </div>
                  )
                })}
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
    } else {
      return (
        <>
          <span>
            <ESpinner isVisible={true} />
          </span>
        </>
      )
    }
  }
}
export default Dashboard
