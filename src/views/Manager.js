import { useCustomAxios } from '../Hooks/useAxios'
import React from 'react'
import SectionTitle from '../components/SectionTitle'
import logo from '../assets/images/logo.jpg'
import DataTableFilter from './DataTableFilter'
import ESpinnerBig from '../components/ESpinnerBig'
import InstanceViewer from './InstanceViewer'
// import Dropdown from './Dropdown'

// const menu = ['mohamed.hm.mahmoud', 'mahmoud.hadad', 'baher.shehata']

const Manager = () => {

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

  const managerPerformanceResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/Manager/performance/${localStorage.getItem('username')}`,
    },
    localStorage.getItem('username') +
      '+performance+' +
      new Date().toLocaleDateString(),
  )


  const { loading, response } = useCustomAxios(
    {
      method: 'GET',
      url: `/Manager/reps/${localStorage.getItem('username')}`,
    },
    localStorage.getItem('username') +
      '+reps+' +
      new Date().toLocaleDateString(),
  )
  const supervisorsResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/Manager/supervisors/${localStorage.getItem('username')}`,
    },
    localStorage.getItem('username') +
      '+supervisors+' +
      new Date().toLocaleDateString(),
  )

  const salesRepTargetAchievedResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/Manager/targetAchieved/${localStorage.getItem('username')}`,
    },
    localStorage.getItem('username') +
      '+targetAchieved+' +
      new Date().toLocaleDateString(),
  )

  const managerMerchantsCountResponse = useCustomAxios(
    {
      method: 'GET',
      url: `/Manager/${localStorage.getItem('username')}/merchantsNumber`,
    },
    localStorage.getItem('username') +
      '+merchantsNumber+' +
      new Date().toLocaleDateString(),
  )

  const cols = React.useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
    },
    {
      Header: 'Performance',
      accessor: 'performaceIndicator', // String-based value accessors!
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
    {
      Header: 'POS',
      accessor: 'numberOfPOS', // String-based value accessors!
      Filter: SelectColumnFilter,
    },
    {
      Header: 'Target',
      accessor: 'target', // String-based value accessors!
    },
    {
      Header: 'Achieved Total',
      accessor: 'achievedTotal', // String-based value accessors!
    },
    {
      Header: 'Achieved Airtime',
      accessor: 'achievedAirtime', // String-based value accessors!
    },
    {
      Header: 'Achieved Bills',
      accessor: 'achievedBills', // String-based value accessors!
    },
    {
      Header: 'Achieved Utilities',
      accessor: 'achievedUtilities', // String-based value accessors!
    },
    {
      Header: 'Achieved Cash In',
      accessor: 'achievedCashIn', // String-based value accessors!
    },
    {
      Header: 'Achieved Cash Out',
      accessor: 'achievedCashOut', // String-based value accessors!
    },
    
  ])

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

  if (
    loading ||
    supervisorsResponse.loading ||
    salesRepTargetAchievedResponse.loading ||
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
                    <div className={'flex gap-2'}>
                      <InstanceViewer
                        value={managerPerformanceResponse?.response}
                        instance={'الاداء'}
                      />
                    </div>
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
          <SectionTitle title={'المشرفين'} />
          <DataTableFilter
            columns={cols}
            data={supervisorsResponse.response}
          />
          <SectionTitle title={'المناديب'} />
          <DataTableFilter columns={cols} data={response} />
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

