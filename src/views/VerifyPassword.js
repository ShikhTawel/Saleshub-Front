// import axios from "axios"
// import { useState } from "react"
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../env'
// import { BASE_URL } from "../env"
// import { toast } from 'react-toastify'

const VerifyPassword = () => {
  // const [isLoginLoading, setIsLoginLoading] = useState(false)
  // const navigate = useNavigate()

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  useEffect(() => {
    axios
      .get(`${BASE_URL}auth/verify?verificationId=` + params.get('account'))
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params])

  return (
    <>
      <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
        <h1>Hello</h1>
      </div>
    </>
  )
}

export default VerifyPassword
