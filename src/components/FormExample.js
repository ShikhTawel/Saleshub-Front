import { useState } from "react"

const FormExample = () => {
  const [isCheked, setIsChecked] = useState(true)
  const [fieldValues, setFieldValues] = useState([
    {
      id: 1,
      type: "checkbox",
      label: "LG",
      value: false,
    },
    {
      id: 2,
      type: "checkbox",
      label: "Samsung",
      value: false,
    },
    {
      id: 3,
      type: "checkbox",
      label: "Sharp",
      value: false,
    },
    {
      id: 4,
      type: "checkbox",
      label: "Ideal",
      value: false,
    },
    {
      id: 5,
      type: "checkbox",
      label: "Tornado",
      value: false,
    },
  ])
  const handleChange = (e) => {
    console.log(fieldValues)
    let newState = [...fieldValues]
    for (let i = 0; i < newState.length; i++) {
      if (newState[i]["label"] === e.target.id) {
        if (newState[i]["type"] === "checkbox") {
          console.log(e.target.value === "on")
          newState[i]["value"] = !newState[i]["value"]
        } else newState[i]["value"] = e.target.value
      }
    }
    setFieldValues(newState)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(fieldValues)
  }

  const getFiled = (filed) => (
    <div className={"f-row items-center gap-3"}>
      <input
        key={filed.id}
        type={filed.type}
        name={filed.label}
        id={filed.label}
        onChange={(e) => handleChange(e)}
        checked={filed.value}
      />
      <label className={"select-none"} htmlFor={filed.label}>
        {filed.label}
      </label>
    </div>
  )
  return (
    <>
      <form onSubmit={handleSubmit}>
        {fieldValues.map((filed) => (
          <div key={filed.id}>{getFiled(filed)}</div>
        ))}

        <input type={"radio"} id={"red"} name={"color"} />
        <label htmlFor={"red"} className={"flex border border-black"}>
          <div>
            <span>Hello</span>
          </div>
        </label>
        <input type={"radio"} id={"orange"} name={"color"} />
        <input type={"radio"} id={"yellow"} name={"color"} />

        <input type={"submit"} />
      </form>
    </>
  )
}
export default FormExample
