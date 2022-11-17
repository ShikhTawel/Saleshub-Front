import FInputField from "./FInputField"
import React from "react"
import { HiOutlineX } from "react-icons/hi"

const DataTableFilterBlock = ({
  columns,
  allFilters,
  setAllFilters,
  filterOptions,
  setFilterOptions,
}) => {
  const handleAddExtraFilter = () =>
    setFilterOptions([
      ...filterOptions,
      { value: "", key: "", id: filterOptions.length },
    ])

  const handleKeySelect = (e, index) => {
    const { value } = e.target
    let copyFilterOptions = [...filterOptions]
    copyFilterOptions[index].key = value
    setFilterOptions(copyFilterOptions)
  }
  const handleValueChange = (e) => {
    const { value, name } = e.target
    let copyFilterOptions = [...filterOptions]
    copyFilterOptions[name].value = value
    setFilterOptions(copyFilterOptions)
  }
  const handleRemoveExtraFilter = (index) => {
    let copyFilterOptions = [...filterOptions]
    copyFilterOptions.splice(index, 1)
    setFilterOptions(copyFilterOptions)
  }
  return (
    <div className={"w-full"}>
      {filterOptions.map((filter, index) => (
        <div
          key={index}
          className={"flex w-full flex-row-reverse items-center  gap-5 rounded  p-3"}
        >
          {filterOptions.length > 1 && (
            <div
              onClick={() => handleRemoveExtraFilter(index)}
              style={{ minWidth: "30px", minHeight: "30px" }}
              className={
                "f-col-center-center rounded   bg-white  p-1  hover:cursor-pointer hover:bg-gray-200"
              }
            >
              <HiOutlineX style={{ minWidth: "20px" }} size={15} />
            </div>
          )}

          <select
            value={filterOptions[[index]].key}
            onChange={(e) => handleKeySelect(e, index)}
            className={"input-style"}
          >
            <option value={""}>اختر صف</option>
            {columns.map((col, anotherIndex) => (
              <option key={anotherIndex + 10} value={col.accessor}>
                {col.Header}
              </option>
            ))}
          </select>
          <select className={"input-style"}>
            <option className={"is"}>يســــاوي (=)</option>
          </select>
          <FInputField
            type={"text"}
            name={index}
            value={filterOptions[[index]].value}
            onChange={(e) => handleValueChange(e)}
          />
        </div>
      ))}
      <span
        className={
          "my-3 block w-fit rounded border bg-orient-500 bg-white px-2 py-1 text-sm text-white hover:cursor-pointer"
        }
        onClick={handleAddExtraFilter}
      >
        إضافة خاصية
      </span>
    </div>
  )
}
export default DataTableFilterBlock
