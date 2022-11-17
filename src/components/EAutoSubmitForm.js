import React from "react"
import { useFormik, useFormikContext } from "formik"
import * as yup from "yup"
import RecursiveContainer from "./RecursiveContainer"

const ValueChangeListener = () => {
  const { submitForm, values } = useFormikContext()

  // useEffect(() => {
  //     if (values) {
  //         submitForm();
  //     }
  // }, [values, submitForm]);

  return null
}

const response = [
  {
    type: "checkbox",
    field: "name",
    label: "User's name",
    value: "Boody",
  },
  {
    type: "checkbox",
    field: "number",
    label: "User's age",
    value: "Reda",
  },
]

const submitMyForm = ({ type, value }) => console.log(type, value)

const validationSchema = yup.object({
  type: yup.string().required(), // Type is required!!
  value: yup.string().required(),
})

const getInitialValues = () => {
  let initialValues = {}
  response.forEach((entry) => {
    let tempObj = {}
    tempObj[entry["field"]] = entry["value"]
    initialValues = { ...initialValues, ...tempObj }
  })
  return initialValues
}
const EAutoSubmitForm = () => {
  const formik = useFormik({
    initialValues: getInitialValues(),
  })

  const anotherFormik = useFormik({
    initialValues: {
      name: "Ziko",
    },
  })

  return (
    <>
      <div>
        <form onSubmit={submitMyForm}>
          <RecursiveContainer config={response} formik={formik} />
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={submitMyForm}>
          <input
            name={"name"}
            id={"name"}
            onChange={anotherFormik.handleChange}
            value={anotherFormik.values["name"]}
            className={"bg-red-500"}
          />

          <ValueChangeListener />
        </form>
      </div>
    </>
  )
}

export default EAutoSubmitForm
