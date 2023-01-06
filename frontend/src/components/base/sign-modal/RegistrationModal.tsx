import successImage from '@/assets/images/success.svg'
import Button from '@/components/UI/Button'
import { MessageBox } from '@/components/UI/MessageBox'
import { MyInput } from '@/components/UI/MyInput'
import { register as registerFunc } from '@/redux/actions/login-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FieldValues } from 'react-hook-form'
import { isDataLoginData } from './common'

type Props = {
  setAnotherModal: () => void
}

const initialValues = { email: '', password: '', passwordConfirm: '' }

const RegistrationModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()
  const { error, isSuccess } = useAppSelector(({ register }) => register)

  const onSubmit = (data: FieldValues) => {
    if (isDataLoginData(data)) dispatch(registerFunc(data))
  }

  if (isSuccess)
    return (
      <MessageBox
        imageSrc={successImage}
        title="Success!"
        subtitle="Now you can login into your account"
        className="modal relative flex flex-col w-full h-full items-center justify-center"
      >
        <Button onClick={setAnotherModal} type="button" className="w-full mt-4">
          Log in
        </Button>
      </MessageBox>
    )

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="modal relative">
        <h3 className="modal-header mb-3 text-center text-xl">Sign Up</h3>
        <Field name="email" className="block w-full mb-3">
          {({ field }: FieldProps) => (
            <MyInput className="block w-full mb-3" placeholder="Email" type="email" {...field} />
          )}
        </Field>
        <Field name="password" className="block w-full mb-3">
          {({ field }: FieldProps) => (
            <MyInput className="block w-full mb-3" placeholder="Password" type="password" {...field} />
          )}
        </Field>
        <Field name="passwordAgain" className="block w-full mb-3">
          {({ field }: FieldProps) => (
            <MyInput className="block w-full mb-3" placeholder="Repeat password" type="password" {...field} />
          )}
        </Field>
        <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
          Already have an account?
        </span>
        <Button type="submit" className="w-full mt-4">
          Sign up
        </Button>
      </Form>
    </Formik>
  )
}

export { RegistrationModal }
