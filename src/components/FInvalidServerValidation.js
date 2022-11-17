import React from "react"

const InvalidValidationComponent = ({ InvalidServerValidation }) => (
  <>
    <div
      className={
        "my-3 rounded border border-red-500 bg-red-100 p-1 shadow-sm shadow-inner drop-shadow-sm"
      }
    >
      <span className={"block text-center font-medium text-red-800"}>
        {" "}
        {InvalidServerValidation}{" "}
      </span>
    </div>
  </>
)
const FInvalidServerValidation = ({ InvalidServerValidation }) => (
  <>
    {InvalidServerValidation !== "" ? (
      <InvalidValidationComponent
        InvalidServerValidation={InvalidServerValidation}
      />
    ) : (
      ""
    )}
  </>
)
export default FInvalidServerValidation
