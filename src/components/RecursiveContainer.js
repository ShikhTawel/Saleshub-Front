const RecursiveContainer = ({ config, formik }) => {
  const builder = (individualConfig) => {
    switch (individualConfig.type) {
      case "checkbox":
        return (
          <>
            <div>
              <input
                type="checkbox"
                name={individualConfig.field}
                id={individualConfig.field}
                onChange={formik.handleChange}
                value={
                  formik.values[individualConfig.field] === undefined
                    ? ""
                    : formik.values[individualConfig.field]
                }
                style={{ ...individualConfig.style }}
              />

              <label className={"select-none"} htmlFor={individualConfig.field}>
                {individualConfig.label}
              </label>
            </div>
          </>
        )
      case "text":
        return (
          <>
            <div>
              <label htmlFor={individualConfig.field}>
                {individualConfig.label}
              </label>
              <input
                type="text"
                name={individualConfig.field}
                onChange={formik.handleChange}
                style={{ ...individualConfig.style }}
                value={
                  formik.values[individualConfig.field] === undefined
                    ? ""
                    : formik.values[individualConfig.field]
                }
              />
            </div>
          </>
        )
      case "number":
        return (
          <>
            <div>
              <label htmlFor={individualConfig.field}>
                {individualConfig.label}
              </label>
              <input
                type="number"
                name={individualConfig.field}
                onChange={formik.handleChange}
                style={{ ...individualConfig.style }}
                value={
                  formik.values[individualConfig.field] === undefined
                    ? ""
                    : formik.values[individualConfig.field]
                }
              />
            </div>
          </>
        )
      case "array":
        return (
          <RecursiveContainer
            config={individualConfig.children || []}
            formik={formik}
          />
        )
      default:
        return <div>Unsupported field</div>
    }
  }

  return <>{config.map((c) => builder(c))}</>
}

export default RecursiveContainer
