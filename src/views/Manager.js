import { useCustomAxios } from '../Hooks/useAxios'
import React from 'react'
import SectionTitle from '../components/SectionTitle'
import logo from '../assets/images/logo.jpg'
import DataTableFilter from './DataTableFilter'
import ESpinnerBig from '../components/ESpinnerBig'

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

  const repsCols = React.useMemo(() => [
    {
      Header: 'name',
      accessor: 'name', // String-based value accessors!
    },
    {
      Header: 'Supervisor',
      accessor: 'managerName', // String-based value accessors!
      Filter: SelectColumnFilter,
    },
    {
      Header: 'POS',
      accessor: 'numberOfPOS', // String-based value accessors!
      Filter: SelectColumnFilter,
    },
    {
      Header: 'target',
      accessor: 'target', // String-based value accessors!
    },
    {
      Header: 'achieved Total',
      accessor: 'achievedTotal', // String-based value accessors!
    },
    {
      Header: 'achieved Airtime',
      accessor: 'achievedAirtime', // String-based value accessors!
    },
    {
      Header: 'achieved Bills',
      accessor: 'achievedBills', // String-based value accessors!
    },
    {
      Header: 'achieved Cash In',
      accessor: 'achievedCashIn', // String-based value accessors!
    },
    {
      Header: 'achieved Cash Out',
      accessor: 'achievedCashOut', // String-based value accessors!
    },
  ])

  const supervisorsCols = React.useMemo(() => [
    {
      Header: 'name',
      accessor: 'name', // String-based value accessors!
    },
    {
      Header: 'target',
      accessor: 'target', // String-based value accessors!
    },
    {
      Header: 'achieved Total',
      accessor: 'achievedTotal', // String-based value accessors!
    },
    {
      Header: 'achieved Airtime',
      accessor: 'achievedAirtime', // String-based value accessors!
    },
    {
      Header: 'achieved Bills',
      accessor: 'achievedBills', // String-based value accessors!
    },
    {
      Header: 'achieved Cash In',
      accessor: 'achievedCashIn', // String-based value accessors!
    },
    {
      Header: 'achieved Cash Out',
      accessor: 'achievedCashOut', // String-based value accessors!
    },
  ])

  if (loading || supervisorsResponse.loading || salesRepTargetAchievedResponse.loading) {
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
            columns={supervisorsCols}
            data={supervisorsResponse.response}
          />
          <SectionTitle title={'المناديب'} />
          <DataTableFilter columns={repsCols} data={response} />
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
