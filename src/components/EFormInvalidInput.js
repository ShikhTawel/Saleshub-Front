const EFormInvalidInput = ({ touched, errors, FieldName }) => (
  <>
    {touched[FieldName] === true ? (
      <small className={"text-right font-medium text-red-700"}>
        {errors[FieldName]}
      </small>
    ) : (
      ""
    )}
  </>
)
export default EFormInvalidInput
