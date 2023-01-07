import successImage from '@/assets/images/success.svg'
import Button from '@/components/UI/Button'
import { MessageBox } from '@/components/UI/MessageBox'
import { MyInput } from '@/components/UI/MyInput'
import { InputFormikWithErrors } from '@/components/order-page/InputFormik/InputFormikWithErrors'
import { useAppDispatch } from '@/redux/common/hooks'
import { LoginService } from '@/service/api/LoginService'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { isDataLoginData } from './common'
import { registrationSchema } from './schema'

type Props = {
  setAnotherModal: () => void
}

const initialValues = { email: '', password: '', passwordConfirm: '' }

const RegistrationModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const onSubmit = (data: FieldValues) => {
    if (isDataLoginData(data))
      LoginService.register(data)
        .then(() => setIsSuccess(true))
        .catch(() => setIsSuccess(false))
  }

  if (isSuccess)
    return (
      <MessageBox
        imageSrc={successImage}
        title="Success!"
        subtitle="Now you can should confirm your email address"
        className="modal relative flex flex-col w-full h-full items-center justify-center"
      >
        <Button onClick={setAnotherModal} type="button" className="w-full mt-4">
          Log in
        </Button>
      </MessageBox>
    )

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data, { resetForm }) => {
        onSubmit(data)
        resetForm()
      }}
      validationSchema={registrationSchema}
    >
      {({ errors }) => (
        <Form className="modal relative">
          <h3 className="modal-header mb-3 text-center text-xl">Sign Up</h3>
          <InputFormikWithErrors
            errors={errors}
            name="email"
            renderItem={(field) => <MyInput placeholder="Email" type="email" {...field} />}
          />
          <InputFormikWithErrors
            errors={errors}
            name="password"
            className="block my-4"
            classNameForInput="w-full"
            renderItem={(field) => <MyInput placeholder="Password" type="password" {...field} />}
          />
          <InputFormikWithErrors
            errors={errors}
            name="passwordConfirm"
            classNameForInput="w-full"
            className="block my-4"
            renderItem={(field) => <MyInput placeholder="Confirm password" type="password" {...field} />}
          />
          <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
            Already have an account?
          </span>
          <Button type="submit" className="w-full mt-4">
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export { RegistrationModal }
