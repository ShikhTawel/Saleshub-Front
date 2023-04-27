import React from 'react'
import { ovdFilter, PerformanceIndicatorsColumnFilter, SelectColumnFilter } from './TableFilter'

export function getRepsColumns() {
  return React.useMemo(() => [
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
      Filter: PerformanceIndicatorsColumnFilter,
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
}

export function getMerchantsColumns() {
    return React.useMemo(() => {
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
            filter: 'exact'
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
            Filter: PerformanceIndicatorsColumnFilter,
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
    
            Filter: PerformanceIndicatorsColumnFilter,
          },
        ]
      }, [])
}
