import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const formSchema = yup.object().shape({
  name: yup.string().min(4).required('Name cannot be empty'),
  email: yup.string().min(4).email('This is not valid email').required('Email cannot be empty'),
  number: yup.string().min(4).required('Number cannot be empty'),
  post: yup.string().min(4).required('Post cannot be empty'),
  city: yup.string().min(4).required('City cannot be empty')
})

export { formSchema }
