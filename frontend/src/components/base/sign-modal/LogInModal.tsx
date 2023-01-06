import { InputFormikWithErrors } from '@/components/order-page/InputFormik/InputFormikWithErrors'
import Button from '@/components/UI/Button'
import { MyInput } from '@/components/UI/MyInput'
import { login } from '@/redux/actions/login-action'
import { useAppDispatch } from '@/redux/common/hooks'
import { Form, Formik, FormikValues, useFormik } from 'formik'
import { useEffect } from 'react'
import { isDataLoginData } from './common'
import { loginSchema } from './schema'

type Props = {
  setAnotherModal: () => void
}

const initialValues = { email: '', password: '' }

const LogInModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()

  const onSubmit = (data: FormikValues) => {
    if (isDataLoginData(data)) dispatch(login(data))
  }

  const { setErrors } = useFormik({
    validationSchema: loginSchema,
    initialValues,
    onSubmit
  })

  useEffect(() => setErrors({}), [])

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={initialValues}
      onSubmit={(data, { resetForm }) => {
        onSubmit(data)
        resetForm()
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
