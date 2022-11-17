import React, { useEffect, useState } from "react"
import FButton from "../FButton"
import emptyState from "../../assets/images/emptyState.svg"
import ESpinner from "../ESpinner"
import FIconWrapper from "../FIconWrapper"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import FInputField from "../FInputField"
import { RiSettings5Line } from "react-icons/ri"
import FModal from "../FModal"
import FilterComponent from "../FilterComponent"
import { MdFilterList } from "react-icons/md"
import { IoReload } from "react-icons/io5"
import { QueryBuilder } from "react-querybuilder"

const DataTable = ({
  data,
  columns,
  totalNumberOfPages,
  isLoading,
  page,
  setPage,
  rowFunction,
  allFilters,
  setAllFilters,
  filterOptions,
  setFilterOptions,
  Refetch,
}) => {
  const [isConfigTableModalOpen, setIsConfigTableModalOpen] = React.useState(false)
  const [isFilterTableModalOpen, setIsFilterTableModalOpen] = React.useState(false)
  const [isFilterApplied, setIsFilterApplied] = React.useState(false)
  const [isFilterReset, setIsFilterReset] = React.useState(false)
  const initialQuery = {
    combinator: "and",
    rules: [],
  }

  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    if (isFilterReset) {
      Refetch()
      setIsFilterReset(false)
      setIsFilterApplied(false)
    }
  }, [filterOptions])
  const [showedColumns, setShowedColumns] = React.useState(
    columns.map((col) => ({ display: true, ...col }))
  )
  const fields = columns.map((col) => ({ name: col.accessor, label: col.Header }))

  const getNextPage = () => setPage(page + 1)
  const getPreviousPage = () => setPage(page - 1)

  const handleCellValue = (row, col) => {
    if (row[col.accessor] === undefined || row[col.accessor] === null) {
      return "N/A"
    }

    return col.cell ? col.cell(row[col.accessor], row) : row[col.accessor]
  }

  const removeFilter = () => {
    setIsFilterReset(true)
    setFilterOptions([
      ...filterOptions.filter((f) => f.id === -1),
      ...[
        {
          id: 0,
          value: "",
          key: "",
        },
      ],
    ])
    // setPage(0)
    // Refetch()
  }
  return (
    <>
      <FModal
        setIsOpen={setIsConfigTableModalOpen}
        isOpen={isConfigTableModalOpen}
        title={"تهيئة الجدول"}
      >
        {columns.map((col, index) => (
          <div className={"flex   gap-10 "} key={index}>
            <div className={"flex gap-3  "}>
              <FInputField
                className={"h-4 w-4"}
                type={"checkbox"}
                id={columns[index].accessor}
                name={columns[index].accessor}
                value={col.accessor}
                checked={showedColumns[index].display}
                onChange={(e) => {
                  const newShowedColumns = showedColumns.map((c) => {
                    if (c.accessor === e.target.value) {
                      return { ...c, display: e.target.checked }
                    }
                    return c
                  })
                  setShowedColumns(newShowedColumns)
                }}
              />
              <label htmlFor={columns[index].accessor}>
                {columns[index].Header}
              </label>
            </div>
          </div>
        ))}
      </FModal>
      <div className={"w-full border"}>
        <div className={"w-full  overflow-x-auto "}>
          <table className={"w-full rounded text-left text-sm text-gray-500 "}>
            <thead
              className={"rounded-t-md bg-gray-50 text-xs uppercase text-gray-700  "}
            >
              <tr className={"rounded"}>
                {showedColumns.map((col, index) => {
                  if (col.display) {
                    return (
                      <th
                        key={index}
                        className={
                          "whitespace-nowrap rounded border-b border-r bg-gray-100 px-3 py-1.5 text-right text-sm"
                        }
                      >
                        {col.Header}
                      </th>
                    )
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div
                      className={"flex items-center justify-center  border-t p-5"}
                    >
                      <ESpinner size={40} isVisible={true} />
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    className={`border bg-white text-right even:bg-gray-50 ${
                      rowFunction && "cursor-pointer hover:bg-orient-100"
                    } `}
                    key={index}
                    onClick={() => rowFunction && rowFunction(row)}
                  >
                    {showedColumns.map((col, index) => {
                      if (col.display) {
                        return (
                          <td
                            key={index}
                            className={
                              "whitespace-nowrap border-r px-3 py-1.5 font-semibold text-gray-700"
                            }
                          >
                            {handleCellValue(row, col)}
                          </td>
                        )
                      }
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {data.length === 0 && !isLoading && (
          <div
            className={
              "  flex flex flex-col items-center justify-center border-x border-b py-20"
            }
          >
            <img src={emptyState} alt={"empty_state"} width={200} className={""} />
            <span className={"mt-5 font-semibold text-gray-700"}>
              لا يوجد بيانات لعرضها في الوقت الحالي !{" "}
            </span>
          </div>
        )}
        <div className={"flex items-center justify-between p-3"}>
          <div className={"mt-1 flex gap-2  "}>
            <FButton
              disabled={page === totalNumberOfPages - 1}
              onClick={() => getNextPage()}
            >
              <FIconWrapper>
                <HiChevronRight />
                <span>التالي</span>
              </FIconWrapper>
            </FButton>
            <FButton
              disabled={totalNumberOfPages === totalNumberOfPages - page}
              onClick={() => getPreviousPage()}
            >
              <FIconWrapper>
                <span>السابق</span>
                <HiChevronLeft />
              </FIconWrapper>
            </FButton>
          </div>
          <span>{`صفحة${page + 1} من ${totalNumberOfPages}`}</span>
        </div>
      </div>
    </>
  )
}

const FCustomDataTable = ({
  cols,
  data,
  isLoading,
  totalNumberOfPages,
  setPage,
  page,
  rowFunction,
  allFilters,
  setAllFilters,
  filterOptions,
  setFilterOptions,
  Refetch,
}) => (
  <>
    <div>
      <DataTable
        isLoading={isLoading}
        totalNumberOfPages={totalNumberOfPages}
        page={page}
        setPage={setPage}
        columns={cols}
        data={data}
        rowFunction={rowFunction}
        allFilters={allFilters}
        setAllFilters={setAllFilters}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        Refetch={Refetch}
      />
    </div>
  </>
)
export default FCustomDataTable
