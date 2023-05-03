import React from 'react'
import {
  closingBalanceFilter,
  ovdFilter,
  PerformanceIndicatorsColumnFilter,
  SelectColumnFilter,
} from './TableFilter'

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
        filter: 'exact',
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
        Header: 'Closing Balance',
        accessor: 'closingBalance', // String-based value accessors!
        Filter: closingBalanceFilter,
        filter: (rows, id, filterValue) => {
          if (filterValue === 'lessThanZero')
            return rows.filter((row) => row.values[id] < 0)
          else if (filterValue === 'equalsZero')
            return rows.filter((row) => row.values[id] === 0)
          else if (filterValue === 'betweenZeroAndFiveHundred')
            return rows.filter(
              (row) => row.values[id] > 0 && row.values[id] <= 500,
            )
          else if (filterValue === 'moreThanFiveHundred')
            return rows.filter((row) => row.values[id] > 500)
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

export function getFeedbackCols() {
  return React.useMemo(() => [
    {
      Header: 'الاسم',
      accessor: 'user', // String-based value accessors!
    },
    {
      Header: 'الوظيفة',
      accessor: 'role', // String-based value accessors!
      Filter: SelectColumnFilter,
    },
    {
      Header: 'المقترح',
      accessor: 'description', // String-based value accessors!
    },
    {
      Header: 'التاريخ',
      accessor: 'creationDate', // String-based value accessors!
    },
    {
      Header: 'النوع',
      accessor: 'type', // String-based value accessors!
      Filter: SelectColumnFilter,
    },
  ])
}


export function getResetPasswordRequestsCols() {
  return React.useMemo(() => [
    {
      Header: 'الاسم',
      accessor: 'username', // String-based value accessors!
    },
    {
      Header: 'الوظيفة',
      accessor: 'role', // String-based value accessors!
      Filter: SelectColumnFilter,
    },
    {
      Header: 'تاريخ تقديم الطلب',
      accessor: 'creationDate', // String-based value accessors!
    },
  ])
}