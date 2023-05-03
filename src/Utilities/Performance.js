import { BASE_URL } from '../env'
import { axiosInstance } from '../api/requister'
import { toast } from 'react-toastify'

export function getColor(performance) {
  if (performance == 'Bad') return 'red'
  else if (performance == 'Good') return 'blue'
  return 'green'
}

export function getPerformance(performance) {
  if (performance == 'Bad') return 'سيئ'
  else if (performance == 'Good') return 'جيد'
  return 'متوسط'
}

export function submitFeedback(values, username, passedRole) {
  if (values.description == '' || values.complainOrSuggestion == '') {
    toast.error('برجاء ملأ جميع البيانات')
    return
  }

  let complainOrSuggestion = {
    user: username,
    role: passedRole,
    description: values.description,
    type: values.complainOrSuggestion,
  }

  let headers = {
    Authorization: localStorage.getItem(`access_token`),
    'Content-Type': 'application/json',
  }

  axiosInstance
    .post(
      `${BASE_URL}submitComplainOrSuggestion`,
      complainOrSuggestion,
      headers,
    )
    .then((res) => {
      toast.info(res.data)
    })
    .catch((err) => {
      if (err.response.data.errors) {
        let errors = err.response.data.errors

        for (let index = 0; index < errors.length; index++) {
          const error = errors[index]
          toast.error(error.message)
        }
      } else toast.error('Error Occurred')
    })
}
