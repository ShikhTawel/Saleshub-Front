import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../env'
import FButton from '../components/FButton'
// import { BASE_URL } from "../env"
// import { toast } from 'react-toastify'

const VerifyPassword = () => {
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  useEffect(() => {
    axios
      .get(`${BASE_URL}auth/verify?verificationId=` + params.get('account'))
      .then(() => {
        setVerified(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params])

  if (verified)
    return (
      <>
        <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
          <h1>Account Verified Successfully</h1>
          <FButton onClick={
            navigate('/dashboard')
          }>Go To Login</FButton>
        </div>
      </>
    )
}

export default VerifyPassword
