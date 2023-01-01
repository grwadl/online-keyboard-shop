import { LoginData } from '@/redux/types/reducers/login'
import { FieldValues } from 'react-hook-form'

const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g

const isDataLoginData = (data: FieldValues): data is LoginData =>
  'email' in data && data.email && 'password' in data && data.password

export { EMAIL_REGEX, isDataLoginData }
