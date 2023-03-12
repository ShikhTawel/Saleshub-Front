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

const ResetPassword = () => {
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  useState(false)
  const navigate = useNavigate()

  //Add Storage Username instead of access_Token
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      return navigate('/dashboard')
    }
  }, [])

  const Formik = useFormik({
    initialValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
    },

    onSubmit: (values) => {
      setIsLoginLoading(true)
      console.log(values)
      let newUserInfo = {
        username: localStorage.getItem('username'),
        password: values.oldPassword,
        currentEmail: '',
        newEmail: values.email,
        newPassword: values.newPassword
      }
        axios
          .post(
            `${BASE_URL}auth/resetPassword`,
            newUserInfo,
          )
          .then((res) => {
            console.log(res);
            setIsLoginLoading(false)
            navigate('')
          })
          .catch((err) => {
            console.log(err.response.data);
            toast.error('Invalid credentials')
            setIsLoginLoading(false);
          })
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      oldPassword: Yup.string().required('Old Password is required'),
      newPassword: Yup.string().required('New Password is required'),
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
          Reset Password
        </span>
        <form noValidate onSubmit={Formik.handleSubmit} className={'w-4/12'}>
          <EFormWrapper className={'w-full'}>
            <FLabel htmlFor={'email'}>ادخل البريد الالكتروني الخاص بك</FLabel>
            <FInputField
              id={'email'}
              type={'email'}
              name={'email'}
              placeholder={'Enter Email'}
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
            <FLabel htmlFor={'oldPassword'}>كلمة المرور الحالية</FLabel>
            <FInputField
              id={'oldPassword'}
              type={'oldPassword'}
              name={'oldPassword'}
              placeholder={'Enter Old Password'}
              value={Formik.values.oldPassword}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />

            <EFormInvalidInput
              touched={Formik.touched}
              FieldName={'oldPassword'}
              errors={Formik.errors}
            />
          </EFormWrapper>
          <EFormWrapper className={'w-full'}>
            <div className={'flex gap-2 justify-between'}>
              <FLabel htmlFor={'newPassword'}>كلمة المرور الجديدة</FLabel>
            </div>
            <FInputField
              type={'newPassword'}
              name={'newPassword'}
              id={'newPassword'}
              placeholder={'Enter New Password'}
              value={Formik.values.newPassword}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            <EFormInvalidInput
              touched={Formik.touched}
              FieldName={'newPassword'}
              errors={Formik.errors}
            />
          </EFormWrapper>
          <EFormWrapper>
            <FButton className={'w-full mt-1'} type={'submit'}>
              <FIconWrapper>
                <ESpinner isVisible={isLoginLoading} />
                <span className={'text-xs'}>Update Password</span>
              </FIconWrapper>
            </FButton>
          </EFormWrapper>
        </form>
        <span className={'text-xs mt-9 text-gray-500'}></span>
      </div>
    </>
  )
}

export default ResetPassword
