import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { axiosInstance } from '../../api/requister'
import FInputField from '../../components/FInputField'
import FLabel from '../../components/FLabel'
import EFormWrapper from '../../components/EFormWrapper'
import EFormInvalidInput from '../../components/EFormInvalidInput'
import FIconWrapper from '../../components/FIconWrapper'
import ESpinner from '../../components/ESpinner'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../../env'
import FButton from '../../components/FButton'
import SideBar from '../../components/Layout/SideBar'


const RemoveUser = () => {
    if (!localStorage.getItem('access_token')) window.location.href = '/'

  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  useState(false)

  const Formik = useFormik({
    initialValues: {
      username: '',
    },

    onSubmit: (values) => {
      setIsLoginLoading(true)

      let removeUserInfo = {
        username: values.username,
      }

      let headers = {
        'Authorization': localStorage.getItem(`access_token`),
        'Content-Type': 'application/json',
      }
      
      axiosInstance
        .post(`${BASE_URL}admin/removeUser`, removeUserInfo, headers)
        .then((res) => {
          console.log(res)
          toast.info(res.data.message)
          setIsLoginLoading(false)
        })
        .catch((err) => {
          setIsLoginLoading(false)

          if (err.response.data.errors) {
            let errors = err.response.data.errors

            for (let index = 0; index < errors.length; index++) {
              const error = errors[index]
              toast.error(error.message)
            }
          } else toast.error('Error Occurred')
        })
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
    }),
  })

  return (
    <>
      <div
        style={{ backgroundColor: 'rgb(247 253 255)' }}
        className="flex max-h-screen min-h-screen w-full flex-grow flex-col bg-orient-500   sm:flex-row">
        {isSideBarOpen && (
          <div
            className={'sidebar-overlay absolute z-20 h-screen w-screen'}></div>
        )}

        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          onClickOutside={() => setIsSideBarOpen(false)}
        />

        <ToastContainer
          position="bottom-left"
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
          <span className={'text-3xl text-gray-800 font-semibold mt-5'}>
            حذف مستخدم
          </span>
          <form noValidate onSubmit={Formik.handleSubmit} className={'w-4/12'}>
            <EFormWrapper className={'w-full'}>
              <FLabel htmlFor={'username'}>ادخل اسم المستخدم المراد حذفه</FLabel>
              <FInputField
                id={'username'}
                type={'username'}
                name={'username'}
                placeholder={'Enter Username'}
                value={Formik.values.username}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />

              <EFormInvalidInput
                touched={Formik.touched}
                FieldName={'username'}
                errors={Formik.errors}
              />
            </EFormWrapper>

            <EFormWrapper>
              <FButton className={'w-full mt-1'} type={'submit'}>
                <FIconWrapper>
                  <ESpinner isVisible={isLoginLoading} />
                  <span className={'text-xs'}>حذف</span>
                </FIconWrapper>
              </FButton>
            </EFormWrapper>
          </form>
          <span className={'text-xs mt-9 text-gray-500'}></span>
        </div>
      </div>
    </>
  )
}

export default RemoveUser
