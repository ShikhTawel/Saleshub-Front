import { useCustomAxios } from '../Hooks/useAxios'
import React from 'react'
import SectionTitle from '../components/SectionTitle'
import logo from '../assets/images/logo.jpg'
import DataTableFilter from './DataTableFilter'

const Supervisor = () => {
  const { loading, response } = useCustomAxios({
    method: 'GET',
    url: `/Supervisor/reps/${localStorage.getItem('username')}`,
  })
  const merchantsResponse = useCustomAxios({
    method: 'GET',
    url: `/Supervisor/merchants/${localStorage.getItem('username')}`,
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
      Header: 'achieved',
      accessor: 'achieved', // String-based value accessors!
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
        <option value="true">Bad</option>
        <option value="false">Good</option>
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
        Header: 'P1 (3 Days)',
        accessor: 'performanceThreeConsecutiveDaysFlag', // String-based value accessors!
        Cell: (row) => {
          return !row.value ? (
            <span
              className={
                'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
              }>
              {' '}
            </span>
          ) : (
            <span
              className={
                'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
              }></span>
          )
        },

        Filter: AnotherSelectColumnFilter,
      },
      {
        Header: 'P2 (2 Days)',
        accessor: 'performanceTwoConsecutiveDaysFlag', // String-based value accessors!
        Cell: (row) => {
          return !row.value ? (
            <span
              className={
                'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
              }>
              {' '}
            </span>
          ) : (
            <span
              className={
                'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
              }></span>
          )
        },
        Filter: AnotherSelectColumnFilter,
      },
      {
        Header: 'P3 (1 Month)',
        accessor: 'performanceWeekFlag', // String-based value accessors!
        Cell: (row) => {
          return !row.value ? (
            <span
              className={
                'text-green-500  px-3 text-xs font-medium border border-green-500 rounded-full bg-green-100'
              }>
              {' '}
            </span>
          ) : (
            <span
              className={
                'text-red-500  px-3 text-xs font-medium border border-red-500 rounded-full bg-red-100'
              }></span>
          )
        },
        Filter: AnotherSelectColumnFilter,
      },
    ]
  }, [])

  if (loading || merchantsResponse.loading) {
    return <span>Loading</span>
  } else {
    return (
      <>
        <div className={'p-5'}>
          <div className={'border primary-shadow p-1 bg-white rounded'}>
            <span className={'text-2xl font-bold'}>المشرف: </span>
            <span className={'text-2xl font-bold'}>
              {localStorage.getItem('username')}
            </span>
          </div>

          <SectionTitle title={'المبيعات'} />
          <DataTableFilter columns={repsCols} data={response} />
          <SectionTitle title={'التجار'} />
          <DataTableFilter
            columns={columns}
            data={merchantsResponse.response}
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
