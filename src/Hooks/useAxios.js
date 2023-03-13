import { useEffect, useState } from 'react'
import axios from 'axios'
import { axiosInstance } from '../api/requister'
import { BASE_URL } from '../env'

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

/**
 fixed :
 - no need to JSON.stringify to then immediatly do a JSON.parse
 - don't use export defaults, because default imports are hard to search for
 - axios already support generic request in one parameter, no need to call specialized ones
 **/
export const useCustomAxios = (axiosParams, cacheKey) => {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)

  const [response, setResponse] = useState([])
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  const fetchData = async (params) => {
    if (cacheKey in sessionStorage) {
      setResponse(JSON.parse(sessionStorage.getItem(cacheKey)))
      setloading(false)
    } else {
      setloading(true)
      try {
        const result = await axiosInstance.request(params)
        setResponse(result.data)
        sessionStorage.setItem(cacheKey, JSON.stringify(result.data))
        setTotalNumberOfPages(result.data.totalPages)
      } catch (error) {
        setError(error)
      } finally {
        setloading(false)
      }
    }
  }
  const Refetch = async () => fetchData(axiosParams)

  useEffect(() => {
    fetchData(axiosParams)
  }, []) // execute once only

  return { response, error, loading, totalNumberOfPages, Refetch }
}
