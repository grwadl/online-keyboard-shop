import { CloseButton } from '@/components/UI/CloseButton'
import { Modal } from '@/components/UI/modal/Modal'
import { useAppSelector } from '@/redux/common/hooks'
import { useEffect, useState } from 'react'
import { LogInModal } from './LogInModal'
import { RegistrationModal } from './RegistrationModal'

type Props = {
  isOpen: boolean
  closeModal: () => void
  className?: string
}

const SignModal = ({ isOpen, closeModal, className }: Props) => {
  const [isLogInOpened, setIsLoginOpened] = useState<boolean>(true)
  const setRegistrationModal = () => setIsLoginOpened(false)
  const setLoginModal = () => setIsLoginOpened(true)
  const { user } = useAppSelector(({ login }) => login)

  useEffect(() => {
    closeModal()
  }, [user?.email])

  return (
    <Modal onCloseModal={closeModal} isOpen={isOpen} className={className}>
      <div className="modal-container relative">
        <CloseButton
          onClick={closeModal}
          className="absolute -top-7 size text-lg hover:text-main-accent cursor-pointer -right-4"
        />

        {isLogInOpened ? (
          <LogInModal setAnotherModal={setRegistrationModal} />
        ) : (
          <RegistrationModal setAnotherModal={setLoginModal} />
        )}
      </div>
    </Modal>
  )
}

export default SignModal
