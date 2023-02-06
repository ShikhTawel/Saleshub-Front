import React from 'react'
import { useTable, usePagination } from 'react-table'
import FButton from '../components/FButton'
import FInputField from '../components/FInputField'

function Table({ columns, data, onRowClick }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
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
      initialState: { pageIndex: 0, pageSize:50},
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    usePagination,
  )

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

  // Render the UI for your table
  return (
    <>
      <table className={'w-full '} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr
              className={
                'bg-orient-500 text-white text-right  text-sm rounded uppercase font-semibold tracking-wider'
              }
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th className={'border p-2'} {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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

const ProDataTable = ({ columns, data, onRowClick }) => {
  return <Table columns={columns} data={data} onRowClick={onRowClick} />
}
export default ProDataTable
