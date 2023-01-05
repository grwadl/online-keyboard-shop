import { useDebounce } from '@/hooks/useDebounce'
import { InitialValue } from '@/pages/OrderPage'
import { changeNovaPoshtaHint } from '@/redux/actions/nova-poshta-actions'
import { useAppDispatch } from '@/redux/common/hooks'
import { useFormikContext } from 'formik'

const FormObserver = () => {
  const { values } = useFormikContext<InitialValue>()
  const dispatch = useAppDispatch()

  useDebounce(() => dispatch(changeNovaPoshtaHint(values)), [values.post, values.city])

  return null
}

export { FormObserver }
