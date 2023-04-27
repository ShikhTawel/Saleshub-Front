import React from "react"

export function SelectColumnFilter({
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

export function ovdFilter({ column: { filterValue, setFilter } }) {
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

export function PerformanceIndicatorsColumnFilter({
  column: { filterValue, setFilter },
}) {
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