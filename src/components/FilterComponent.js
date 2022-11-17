import DataTableFilterBlock from "./DataTableFilterBlock"
import FButton from "./FButton"
import React from "react"

const FilterComponent = ({
  allFilters,
  setAllFilters,
  filterOptions,
  setFilterOptions,
  isFilterTableModalOpen,
  setIsFilterTableModalOpen,
  columns,
  Refetch,
  setIsFilterApplied,
}) => {
  let handleFilter = () => {
    setIsFilterApplied(true)
    Refetch()
    //setIsFilterTableModalOpen(false)
    // setFilter(filterOptions)
    // setPage(1)
  }

  if (isFilterTableModalOpen)
    return (
      <div
        className={
          "absolute right-14 top-14 w-8/12 rounded border  bg-white p-3 shadow-sm"
        }
      >
        <div className="flex w-full flex-col items-center bg-white">
          <DataTableFilterBlock
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            columns={columns}
          />
        </div>
        <div className={"mt-1 mt-3 flex items-center  gap-2"}>
          <FButton onClick={handleFilter}>تصفية</FButton>
          <FButton
            onClick={() => setIsFilterTableModalOpen(false)}
            btnType={"secondary"}
          >
            اغلاق
          </FButton>
        </div>
      </div>
    )
  else return null
}
export default FilterComponent
