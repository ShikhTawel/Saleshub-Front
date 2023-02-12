import { useCustomAxios } from '../Hooks/useAxios'
import React from 'react'
import SectionTitle from '../components/SectionTitle'
import logo from '../assets/images/logo.jpg'
import DataTableFilter from './DataTableFilter'
import DetailsModal from './DetailsModal'
import { useState } from 'react'
import ESpinnerBig from '../components/ESpinnerBig'

const Supervisor = () => {
  const [merchantData, setMerchantData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { loading, response } = useCustomAxios({
    method: 'GET',
    url: `/Supervisor/reps/${localStorage.getItem('username')}`,
  })
  const merchantsResponse = useCustomAxios({
    method: 'GET',
    url: `/Supervisor/merchants/${localStorage.getItem('username')}`,
  })

  const salesRepTargetAchievedResponse = useCustomAxios({
    method: 'GET',
    url: `/Supervisor/targetAchieved/${localStorage.getItem('username')}`,
  })

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

  const repsCols = React.useMemo(() => [
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
  const columns = React.useMemo(() => {
    return [
      {
        Header: 'الكود',
        accessor: 'code', // String-based value accessors!
      },
      {
        Header: 'الأسم',
        accessor: 'name', // String-based value accessors!
      },
      {
        Header: 'merchantClass',
        accessor: 'merchantClass', // String-based value accessors!
        Filter: SelectColumnFilter,
      },
      {
        Header: 'repName',
        accessor: 'repName', // String-based value accessors!
        Filter: SelectColumnFilter,
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
      // {
      //   Header: 'P3 (Cash In)',
      //   accessor: 'performanceMonthlyFlagCashIn', // String-based value accessors!
      //   Cell: (row) => {
      //     if (row.value == 'Good')
      //       return (
      //         <span
      //           className={
      //             'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
      //           }></span>
      //       )
      //     else if (row.value == 'Bad')
      //       return (
      //         <span
      //           className={
      //             'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
      //           }></span>
      //       )
      //     else
      //       return (
      //         <span
      //           className={
      //             'text-yellow-500  px-3 text-xs font-medium border border-yellow-500 rounded-full bg-yellow-100'
      //           }></span>
      //       )
      //   },
      //   Filter: AnotherSelectColumnFilter,
      // },
      // {
      //   Header: 'P4 (Cash Out)',
      //   accessor: 'performanceMonthlyFlagCashOut', // String-based value accessors!
      //   Cell: (row) => {
      //     if (row.value == 'Good')
      //       return (
      //         <span
      //           className={
      //             'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
      //           }></span>
      //       )
      //     else if (row.value == 'Bad')
      //       return (
      //         <span
      //           className={
      //             'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
      //           }></span>
      //       )
      //     else
      //       return (
      //         <span
      //           className={
      //             'text-yellow-500  px-3 text-xs font-medium border border-yellow-500 rounded-full bg-yellow-100'
      //           }></span>
      //       )
      //   },
      //   Filter: AnotherSelectColumnFilter,
      // },
    ]
  }, [])

  if (loading || merchantsResponse.loading) {
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
                      <span className={'text-2xl font-bold'}>المشرف: </span>
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
          <DetailsModal
            merchantData={merchantData}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
          <SectionTitle title={'المبيعات'} />
          <DataTableFilter columns={repsCols} data={response} />
          <SectionTitle title={'التجار'} />
          <DataTableFilter
            columns={columns}
            data={merchantsResponse.response}
            onRowClick={(row) => {
              setIsModalOpen(true)
              setMerchantData(row)
            }}
          />
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

export default Supervisor
