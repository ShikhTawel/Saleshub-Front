import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: 'http://10.100.55.100:2020/api/',
  // baseURL: 'http://localhost:2020/api/',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
})

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    console.log(error.response)
    console.log(error.response.status)
    if (error.response.status === 401 || error.response.status === 0) {
      console.log("token expired")
      localStorage.removeItem("access_token")
      window.location.replace("/login")
    }

    if (error.response.status === 403) {
      console.log("Access Denied")
      localStorage.removeItem("access_token")
      window.location.replace("/forbidden")
    }
    /* if (error.response.status === 500) {
      console.log("Access Denied")
      // localStorage.removeItem('access_token')
      window.location.replace("/servererror")
    }*/
    if (error.response.status === 400) {
      console.log("Redirect to 400 must happen")
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
