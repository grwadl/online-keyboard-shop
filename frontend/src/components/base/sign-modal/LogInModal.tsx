import Button from '@/components/UI/Button'
import { MyInput } from '@/components/UI/MyInput'
import { InputFormikWithErrors } from '@/components/order-page/InputFormik/InputFormikWithErrors'
import { ActionReturn, login } from '@/redux/actions/login-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { HttpError } from '@/utils/HttpError'
import { Form, Formik, FormikValues } from 'formik'
import { isDataLoginData } from './common'
import { loginSchema } from './schema'

type Props = {
  setAnotherModal: () => void
}

const initialValues = { email: '', password: '' }

const LogInModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()

  const onSubmit = async (data: FormikValues): Promise<ActionReturn | void> => {
    if (isDataLoginData(data)) return dispatch(login(data)).unwrap()
  }

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={initialValues}
      onSubmit={(data, { resetForm, setErrors }) => {
        onSubmit(data)
          .then(() => resetForm())
          .catch((e: HttpError) => setErrors({ email: e.message, password: e.message }))
      }}
    >
      {({ errors }) => (
        <Form className="modal relative">
          <h3 className="modal-header mb-3 text-center text-xl">Sign In</h3>
          <InputFormikWithErrors
            errors={errors}
            name="email"
            className="block my-4"
            classNameForInput="w-full"
            renderItem={(field) => <MyInput placeholder="Email" type="email" {...field} />}
          />
          <InputFormikWithErrors
            errors={errors}
            name="password"
            className="block my-4"
            classNameForInput="w-full"
            renderItem={(field) => <MyInput placeholder="Password" type="password" {...field} />}
          />
          <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
            Don't have an account yet?
          </span>
          <Button type="submit" className="w-full mt-4">
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export { LogInModal }
