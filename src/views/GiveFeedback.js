import FModal from '../components/FModal'
import FButton from '../components/FButton'
import FLabel from '../components/FLabel'
import FInputField from '../components/FInputField'
import * as Yup from 'yup'
import { submitFeedback } from '../Utilities/Performance'
import { Field, FormikProvider, useFormik } from 'formik'
import EFormWrapper from '../components/EFormWrapper'
import EFormInvalidInput from '../components/EFormInvalidInput'
import FIconWrapper from '../components/FIconWrapper'

const GiveFeedback = ({ isOpen, setIsOpen }) => {
  const Formik = useFormik({
    initialValues: {
      description: '',
      complainOrSuggestion: '',
    },

    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      complainOrSuggestion: Yup.string().required(
        'Determine The Type is Required',
      ),
    }),
  })

  const handleSubmit = () => {
    submitFeedback(
      Formik.values,
      localStorage.getItem('username'),
      localStorage.getItem('role'),
    )
  }

  return (
    <>
      <FModal
        title={'شكوى او مقترح'}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        callbackFunction={() => {
          Formik.values.description = ''
          Formik.values.complainOrSuggestion = ''
        }}>
        <div>
          <div className={'flex gap-2  items-center justify-center w-full '}>
            <div className={'w-full'}>
              <FormikProvider value={Formik} className={'w-full justify-right'}>
                <form noValidate >
                  <EFormWrapper
                    className={'w-full'}
                    style={{ display: 'justify-right' }}>
                    <Field
                      component="radio-button"
                      name="complainOrSuggestion"
                      placeholder="select options">
                      <label>
                        <input
                          type="radio"
                          name="complainOrSuggestion"
                          value="Complain"
                        />
                        شكوى
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="complainOrSuggestion"
                          value="Suggestion"
                        />
                        اقتراح
                      </label>
                    </Field>
                  </EFormWrapper>

                  <EFormWrapper className={'w-full'}>
                    <FLabel htmlFor={'description'}>
                      ادخل شكواك او مقترحك{' '}
                    </FLabel>
                    <FInputField
                      id={'description'}
                      type={'description'}
                      name={'description'}
                      placeholder={'Enter Description'}
                      value={Formik.values.description}
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                    />

                    <EFormInvalidInput
                      touched={Formik.touched}
                      FieldName={'description'}
                      errors={Formik.errors}
                    />
                  </EFormWrapper>

                  <EFormWrapper>
                    <FButton
                      className={'w-full mt-1'}
                      onClick={handleSubmit}>
                      <FIconWrapper>
                        <span className={'text-xs'}>تسجيل</span>
                      </FIconWrapper>
                    </FButton>
                  </EFormWrapper>
                </form>
              </FormikProvider>
              <span className={'text-xs mt-9 text-gray-500'}></span>
            </div>
          </div>

          <FButton onClick={() => setIsOpen(false)} className={'mt-5'}>
            إغلاق
          </FButton>
        </div>
      </FModal>
    </>
  )
}
export default GiveFeedback
