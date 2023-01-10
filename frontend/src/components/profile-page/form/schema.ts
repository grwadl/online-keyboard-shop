import * as yup from 'yup'

const profileSchema = yup.object().shape({
  name: yup.string().min(2, 'Name can not be empty'),
  password: yup.string().min(4, 'Too short'),
  newPasswordConfirm: yup
    .string()
    .min(4, 'Too short')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  city: yup.string().min(4, 'Too short'),
  postOffice: yup.string().min(4, 'Too short')
})

export { profileSchema }
