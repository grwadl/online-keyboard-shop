import { useDebounce } from '@/hooks/useDebounce'
import { changeNovaPoshtaHint } from '@/redux/actions/nova-poshta-actions'
import { useAppDispatch } from '@/redux/common/hooks'
import { useFormikContext } from 'formik'
import { InitialValue } from './OrderForm'

const FormObserver = () => {
  const { values } = useFormikContext<InitialValue>()
  const dispatch = useAppDispatch()

  useDebounce(() => dispatch(changeNovaPoshtaHint(values)), [values.post, values.city])

  return null
}

export { FormObserver }
