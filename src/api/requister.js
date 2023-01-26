import axios from 'axios'
import { BASE_URL } from '../env'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },

  function (error) {
    if (error.response.status === 401 || error.response.status === 0) {
      localStorage.removeItem('access_token')
      window.location.replace('/login')
    }

    if (error.response.status === 403) {
      localStorage.removeItem('access_token')
      window.location.replace('/forbidden')
    }
    /* if (error.response.status === 500) {
      console.log("Access Denied")
      // localStorage.removeItem('access_token')
      window.location.replace("/servererror")
    }*/
    if (error.response.status === 400) {
      console.log('Redirect to 400 must happen')
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)
