import React from 'react'
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from 'react-table'
import FButton from '../components/FButton'
import FInputField from '../components/FInputField'
// A great library for fuzzy filtering/sorting items

// Define a default UI for filtering

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two

// Let the table remove the filter if the string is empty

// Our table component
function Table({ columns, data, onRowClick }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize:50 },
      defaultColumn, // Be sure to pass the defaultColumn option
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination,
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case

  return (
    <>
      <table className={'w-full '} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, l) => (
            <tr
              className={
                'bg-gray-300 text-right   text-sm rounded uppercase font-semibold tracking-wider'
              }
              key={l}
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, m) => (
                <th className={'border'} key={m} {...column.getHeaderProps()}>
                  <div className={'flex flex-col gap-1'}>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                onClick={() =>
                  onRowClick !== undefined ? onRowClick(row.original) : ''
                }
                className={
                  onRowClick !== undefined
                    ? '  bg-white cursor-pointer hover:bg-gray-100'
                    : ' bg-white'
                }
                key={i}
                {...row.getRowProps()}>
                {row.cells.map((cell, p) => {
                  return (
                    <td
                      className={'border p-2 text-sm'}
                      key={p}
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex w-full gap-1 items-start justify-center bg-white p-1 border-x border-b">
        <div
          className={
            'grid grid-cols-4  items-start justify-center gap-2 bg-white p-1 '
          }>
          <FButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </FButton>
          <FButton onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'السابق'}
          </FButton>
          <FButton onClick={() => nextPage()} disabled={!canNextPage}>
            {'التالي'}
          </FButton>
          <FButton
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}>
            {'>>'}
          </FButton>
        </div>
        <div
          className={
            'flex items-center border gap-3  items-start justify-center'
          }>
          <p> Page {pageIndex + 1}</p>

          <p>of</p>
          <p>{pageOptions.length}</p>
        </div>
        <div className={'flex gap-1 items-center'}>
          <span>Go to page</span>
          <FInputField
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </div>{' '}
        <select
          className={
            ' w-5/12 rounded border border-gray-300 p-1.5 text-sm  shadow-sm ring-orient-400 focus:border focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2'
          }
          
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

const DataTableFilter = ({ columns, data, onRowClick }) => {
  return <Table columns={columns} data={data} onRowClick={onRowClick} />
}

export default DataTableFilter
