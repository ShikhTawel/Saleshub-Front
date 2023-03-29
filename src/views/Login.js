import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FInputField from '../components/FInputField'
import FLabel from '../components/FLabel'
import EFormWrapper from '../components/EFormWrapper'
import FButton from '../components/FButton'
import EFormInvalidInput from '../components/EFormInvalidInput'
import FIconWrapper from '../components/FIconWrapper'
import ESpinner from '../components/ESpinner'
import logo from '../assets/images/fawry-only-report-logo.png'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../env'

const Login = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      return navigate('/dashboard')
    }
  }, [])

  const Formik = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    onSubmit: (values) => {
      setIsLoginLoading(true)
      axios
        .post(`${BASE_URL}auth/login`, values)
        .then((res) => {
          setIsLoginLoading(false)

          let token = res.headers.get('Authorization')

          localStorage.setItem('access_token', token)
          localStorage.setItem('username', values.usernameOrEmail.toLowerCase())
          localStorage.setItem('role', res.data)

          navigate('Dashboard')
        })
        .catch((err) => {
          setIsLoginLoading(false)
          if (err.response.status == 308) {
            localStorage.setItem(
              'username',
              values.usernameOrEmail.toLowerCase(),
            )
            navigate('Reset')
          }
          if (err.response.data.errors != null && err.response.data.errors.length > 0)
            for (
              let index = 0;
              index < err.response.data.errors.length;
              index++
            )
              toast.error(err.response.data.errors[index].message)
          else toast.error('Invalid credentials')
        })
    },
    validationSchema: Yup.object({
      usernameOrEmail: Yup.string().required('Username Or Email is required'),
      password: Yup.string().required('Password is required'),
    }),
  })

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'colored'}
      />
      <div
        className={
          'flex flex-col  items-center justify-center w-full h-screen'
        }>
        <img src={logo} alt={'watchdog_logo'} width={200} />
        <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
          Log in to your account
        </span>
        <span className={'text-sm text-gray-800 mt-4 mb-3'}>
          Welcome back! Please enter your details.
        </span>
        <form noValidate onSubmit={Formik.handleSubmit} className={'w-4/12'}>
          <EFormWrapper className={'w-full'}>
            <FLabel htmlFor={'usernameOrEmail'}>Username</FLabel>
            <FInputField
              id={'usernameOrEmail'}
              type={'usernameOrEmail'}
              name={'usernameOrEmail'}
              placeholder={'Enter Username'}
              value={Formik.values.usernameOrEmail}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />

            <EFormInvalidInput
              touched={Formik.touched}
              FieldName={'usernameOrEmail'}
              errors={Formik.errors}
            />
          </EFormWrapper>
          <EFormWrapper className={'w-full'}>
            <div className={'flex gap-2 justify-between'}>
              <FLabel htmlFor={'password'}>Password</FLabel>
            </div>
            <FInputField
              type={'password'}
              name={'password'}
              id={'password'}
              placeholder={'Enter password'}
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            <EFormInvalidInput
              touched={Formik.touched}
              FieldName={'password'}
              errors={Formik.errors}
            />
          </EFormWrapper>
          <EFormWrapper>
            <FButton className={'w-full mt-1'} type={'submit'}>
              <FIconWrapper>
                <ESpinner isVisible={isLoginLoading} />
                <span className={'text-xs'}>Login</span>
              </FIconWrapper>
            </FButton>
          </EFormWrapper>
        </form>
        <span className={'text-xs mt-9 text-gray-500'}></span>
      </div>
    </>
  )
}

export default Login
