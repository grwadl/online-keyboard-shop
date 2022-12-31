import Button from '@/components/UI/Button'
import { MyInput } from '@/components/UI/MyInput'
import { useState } from 'react'

type Props = {
  setAnotherModal: () => void
}

const initialValue = {
  email: '',
  password: '',
  confirmPassword: ''
} as const

const RegistrationModal = ({ setAnotherModal }: Props) => {
  const [logInCreds, setLogInCreds] = useState<typeof initialValue>(initialValue)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLogInCreds({ ...logInCreds, [e.target.name]: e.target.value })
  return (
    <div className="modal">
      <h3 className="modal-header mb-3 text-center text-xl">Sign Up</h3>
      <MyInput
        otherProps={{ placeholder: 'Email' }}
        className="block w-full mb-3"
        onChange={onChange}
        value={logInCreds.email}
      />
      <MyInput
        otherProps={{ placeholder: 'Password' }}
        className="block w-full mb-3"
        onChange={onChange}
        value={logInCreds.password}
      />
      <MyInput
        otherProps={{ placeholder: 'Confirm password' }}
        className="block w-full mb-3"
        onChange={onChange}
        value={logInCreds.confirmPassword}
      />
      <span className="block w-full cursor-pointer hover:text-main-accent transition-all" onClick={setAnotherModal}>
        Already have an account?
      </span>
      <Button className="w-full mt-4">Sign up</Button>
    </div>
  )
}

export { RegistrationModal }
