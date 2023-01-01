import Button from '@/components/UI/Button'
import { MyInput } from '@/components/UI/MyInput'
import { useFormWithErrors } from '@/hooks/useFormWithErrors'
import { login, removeError } from '@/redux/actions/login-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { FieldValues } from 'react-hook-form'
import { EMAIL_REGEX, isDataLoginData } from './common'

type Props = {
  setAnotherModal: () => void
}

const LogInModal = ({ setAnotherModal }: Props) => {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(({ login }) => login)

  const handlerLogin = (data: FieldValues) => {
    if (isDataLoginData(data)) dispatch(login(data))
  }

  const removeErrorUnmount = () => dispatch(removeError())

  const { errorToDisplay, handleSubmit, register } = useFormWithErrors(handlerLogin, error, removeErrorUnmount)

  return (
    <form className="modal relative" onSubmit={handleSubmit}>
      <h3 className="modal-header mb-3 text-center text-xl">Sign In</h3>
      <MyInput
        otherProps={{
          placeholder: 'Email',
          ...register('email', {
            min: 10,
            pattern: { message: 'This is invalid Email', value: EMAIL_REGEX },
            required: 'Email is required!'
          })
        }}
        className="block w-full mb-3"
      />
      <MyInput
        otherProps={{
          placeholder: 'Password',
          ...register('password', { min: 10, required: "Password can't be empty" })
        }}
        className="block w-full mb-3"
      />
      <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
        Don't have an account yet?
      </span>
      <Button type="submit" className="w-full mt-4">
        Sign in
      </Button>
      {errorToDisplay && (
        <span className="error-form text-red text-sm absolute -bottom-6 left-0">{errorToDisplay}</span>
      )}
    </form>
  )
}

export { LogInModal }
