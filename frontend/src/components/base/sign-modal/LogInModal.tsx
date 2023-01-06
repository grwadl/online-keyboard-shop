import Button from '@/components/UI/Button'
import { MyInput } from '@/components/UI/MyInput'
import { login } from '@/redux/actions/login-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { Field, FieldProps, Form, Formik, FormikValues } from 'formik'
import { isDataLoginData } from './common'

type Props = {
  setAnotherModal: () => void
}

const initialValues = { email: '', password: '' }

const LogInModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()

  const onSubmit = (data: FormikValues) => {
    if (isDataLoginData(data)) dispatch(login(data))
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="modal relative">
        <h3 className="modal-header mb-3 text-center text-xl">Sign In</h3>
        <Field name="email" className="block w-full mb-3">
          {({ field }: FieldProps) => (
            <MyInput className="block w-full mb-3" placeholder="Email" type="email" {...field} />
          )}
        </Field>
        <Field name="password">
          {({ field }: FieldProps) => (
            <MyInput className="block w-full mb-3" {...field} placeholder="Password" type="password" />
          )}
        </Field>
        <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
          Don't have an account yet?
        </span>
        <Button type="submit" className="w-full mt-4">
          Sign in
        </Button>
      </Form>
    </Formik>
  )
}

export { LogInModal }
