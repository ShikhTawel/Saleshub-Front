import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FInputField from "../components/FInputField";
import FLabel from "../components/FLabel";
import EFormWrapper from "../components/EFormWrapper";
import FButton from "../components/FButton";
import FFlexWrapper from "../components/FFlexWrapper";
import EFormInvalidInput from "../components/EFormInvalidInput";
import FIconWrapper from "../components/FIconWrapper";
import ESpinner from "../components/ESpinner";
import logo from '../assets/images/fawry-only-report-logo.png'
const Login = () => {
  const  BASE_URL = 'http://10.100.55.100:2020/api/'
  const [serverErrors, setServerErrors] = useState([])
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
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setIsLoginLoading(true)
      setServerErrors([])
      axios
        .post(`${BASE_URL}SalesRep/checkUsername/${values.email}`, values)
        .then((res) => {
          setIsLoginLoading(false)
          navigate('Dashboard')


        })
        .catch((err) => {
          setIsLoginLoading(false)
        })
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
  })

  return (
    <>
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
            <FLabel htmlFor={'email'}>username</FLabel>
            <FInputField
              id={'email'}
              type={'email'}
              name={'email'}
              placeholder={'Enter email'}
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />

            <EFormInvalidInput
              touched={Formik.touched}
              FieldName={'email'}
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
        <span className={'text-xs mt-9 text-gray-500'}>
          WatchDog V.0.1
        </span>
      </div>
    </>
  )
}

export default Login
