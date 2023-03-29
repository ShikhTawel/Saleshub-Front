import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../env'
import FButton from '../components/FButton'
// import { BASE_URL } from "../env"
// import { toast } from 'react-toastify'

const VerifyPassword = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  useEffect(() => {
    axios
      .get(`${BASE_URL}auth/verify?verificationId=` + params.get('account'))
      .then(() => {
        navigate('/dashboard')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params])

  return (
    <>
      <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
        <h1>Account Verified Successfully</h1>
        <FButton onClick={function(){ navigate('/dashboard')}}>Go To Login</FButton>
      </div>
    </>
  )
}

export default VerifyPassword
