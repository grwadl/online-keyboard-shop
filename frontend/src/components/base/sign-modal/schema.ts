import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup.string().min(4, 'Too short').email('This is not valid email').required('Email is required'),
  password: yup.string().min(4, 'Too short').required('Password is required')
})

const registrationSchema = yup.object().shape({
  email: yup.string().min(4, 'Too short').email('This is not valid email').required('Email is required'),
  password: yup.string().min(4, 'Too short').required('Password is required'),
  passwordConfirm: yup
    .string()
    .min(4, 'Too short')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password is required')
})

export { loginSchema, registrationSchema }
