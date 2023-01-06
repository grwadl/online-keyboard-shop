import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: yup.string().min(4, 'Too short').required('Name is required'),
  email: yup.string().min(4, 'Too short').email('This is not valid email').required('Email is required'),
  number: yup.string().min(4, 'Too short').required('Number is required'),
  post: yup.string().min(4, 'Too short').required('Post is required'),
  city: yup.string().min(4, 'Too short').required('City is required')
})

export { formSchema }
