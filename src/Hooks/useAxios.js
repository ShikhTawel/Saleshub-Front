import { useEffect, useState } from "react"
import axios from "axios"
import { axiosInstance } from "../api/requister"

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com"

/**
 fixed :
 - no need to JSON.stringify to then immediatly do a JSON.parse
 - don't use export defaults, because default imports are hard to search for
 - axios already support generic request in one parameter, no need to call specialized ones
 **/
export const useCustomAxios = (axiosParams) => {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)

  const [response, setResponse] = useState([])
  const [error, setError] = useState("")
  const [loading, setloading] = useState(true)

  const fetchData = async (params) => {
    setloading(true)
    try {
      const result = await axiosInstance.request(params)
      setResponse(result.data)
      setTotalNumberOfPages(result.data.totalPages)
    } catch (error) {
      setError(error)
    } finally {
      setloading(false)
    }
  }
  const Refetch = async () => fetchData(axiosParams)

  useEffect(() => {
    fetchData(axiosParams)
  }, []) // execute once only

  return { response, error, loading, totalNumberOfPages, Refetch }
}
