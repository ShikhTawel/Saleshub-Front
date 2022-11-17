import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table"
import React from "react"
import { BsChevronExpand } from "react-icons/bs"
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi"
import emptyState from "../../src/assets/images/emptyState.svg"

const FTable = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const GlobalFilter = ({ filter, setFilter }) => (
    <div className={""}>
      <input
        value={filter || ""}
        type={"text"}
        onChange={(e) => setFilter(e.target.value)}
        className={"form-input mb-1 w-full border  border-gray-300 p-1"}
        placeholder={"أبحث  ..."}
      />
    </div>
  )

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table
        className={"w-full rounded border text-left text-sm text-gray-500"}
        {...getTableProps()}
      >
        <thead
          className={"rounded-t-md bg-gray-50 text-xs uppercase text-gray-700  "}
        >
          {headerGroups.map((headerGroup) => (
            <tr className={"rounded"} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className={"rounded px-3 py-3 "}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className={"flex gap-1"}>
                    <span>{column.render("Header")}</span>
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <HiOutlineChevronUp />
                        ) : (
                          <HiOutlineChevronDown />
                        )
                      ) : (
                        <BsChevronExpand className={"text-gray-400"} />
                      )}
                    </span>
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
                className={"border border-b-gray-100 bg-white even:bg-gray-50  "}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td className={"border-b p-3  "} {...cell.getCellProps()}>
                    {<span className={"text-xs"}>{cell.render("Cell")}</span>}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={"  flex flex flex-col items-center justify-center py-20"}>
          <img src={emptyState} width={200} className={""} />
          <span className={"mt-5 font-semibold text-gray-700"}>
            لا يوجد بيانات لعرضها في الوقت الحالي !{" "}
          </span>
        </div>
      )}

      <div className="mt-5 flex w-full items-center justify-between    gap-5 border-t border-b border-gray-300 bg-gray-50 py-2  ">
        <div>
          <span>
            Go to page:{" "}
            <input
              className={"rounded border  border-gray-300 bg-white"}
              type="number"
              min={1}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            className={"rounded border  border-gray-300 bg-white"}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className={"flex items-center gap-2 "}>
          <div className={" flex "}>
            <button
              className={
                "relative inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className={
                "relative inline-flex items-center  border border-r-0 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <button
              className={
                "relative inline-flex  items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className={
                "relative inline-flex  items-center  rounded-r-md border border-l-0 border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              }
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
          </div>
          <div>
            <span>الصفحة</span>{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </div>
        </div>
      </div>
    </>
  )
}
export default FTable
