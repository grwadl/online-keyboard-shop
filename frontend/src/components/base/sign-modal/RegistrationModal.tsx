import successImage from '@/assets/images/success.svg'
import Button from '@/components/UI/Button'
import { MessageBox } from '@/components/UI/MessageBox'
import { MyInput } from '@/components/UI/MyInput'
import { useFormWithErrors } from '@/hooks/useFormWithErrors'
import { register as registerFunc } from '@/redux/actions/login-action'
import { removeError } from '@/redux/actions/register-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { FieldValues } from 'react-hook-form'
import { EMAIL_REGEX, isDataLoginData } from './common'

type Props = {
  setAnotherModal: () => void
}

const RegistrationModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()
  const { error, isSuccess } = useAppSelector(({ register }) => register)

  const handlerRegistration = (data: FieldValues) => {
    if (isDataLoginData(data)) dispatch(registerFunc(data))
  }

  const removeErrorUnmount = () => dispatch(removeError())

  const { errorToDisplay, handleSubmit, register } = useFormWithErrors(handlerRegistration, error, removeErrorUnmount)

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
    <form className="modal relative" onSubmit={handleSubmit}>
      <h3 className="modal-header mb-3 text-center text-xl">Sign Up</h3>
      <MyInput
        placeholder="Email"
        {...register('email', {
          min: 10,
          pattern: { message: 'This is invalid Email', value: EMAIL_REGEX },
          required: 'Email is required!'
        })}
        className="block w-full mb-3"
      />
      <MyInput {...register('password', { required: true })} placeholder="Password" className="block w-full mb-3" />
      <MyInput
        placeholder="Confirm password"
        {...register('passwordConfirm', { required: true })}
        className="block w-full mb-3"
      />
      <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
        Already have an account?
      </span>
      <Button type="submit" className="w-full mt-4">
        Sign up
      </Button>
      {errorToDisplay && (
        <span className="error-form text-red text-sm absolute -bottom-6 left-0">{errorToDisplay}</span>
      )}
    </form>
  )
}

export { RegistrationModal }
