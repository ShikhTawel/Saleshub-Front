import { isJSONParsable } from "../helpers/utils"

export const UseLocalStorageContent = () => {
  let values = {},
    keys = Object.keys(localStorage),
    i = keys.length
  while (i--) {
    let obj = {}
    isJSONParsable(localStorage.getItem(keys[i]))
      ? (obj[keys[i]] = JSON.parse(localStorage.getItem(keys[i])))
      : (obj[keys[i]] = localStorage.getItem(keys[i]))
    {
      values = { ...values, ...obj }
    }
  }
  return values
}
