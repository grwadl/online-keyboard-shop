import { MyInput } from '@/components/UI/MyInput'
import { InitialValue } from '@/pages/OrderPage'
import { changeActiveField, clearActiveField } from '@/redux/actions/nova-poshta-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { FieldProps, useField, useFormikContext } from 'formik'

type ExtendedFieldProps = FieldProps & {
  className?: string
}

const InputFormik = ({ field, className, disabled }: ExtendedFieldProps & { disabled?: boolean }) => {
  const [props] = useField(field)
  const { setFieldValue } = useFormikContext()
  const { name } = field

  const dispatch = useAppDispatch()
  const { activeField } = useAppSelector(({ post }) => post)

  const onFocus = () => (name === 'city' || name === 'post') && dispatch(changeActiveField(name))
  const onBlur = () => dispatch(clearActiveField())

  return (
    <div className={`relative ${className}`}>
      <MyInput {...props} {...field} disabled={disabled} onFocus={onFocus} onBlur={onBlur} />
      {activeField === name && (
        <div onClick={() => setFieldValue(name, 'hint')} className="hint">
          hint
        </div>
      )}
    </div>
  )
}

const InputPostFormik = (props: ExtendedFieldProps & { disabled?: boolean }) => {
  const {
    values: { city }
  } = useFormikContext<InitialValue>()

  return <InputFormik disabled={!city} {...props} />
}

export { InputFormik, InputPostFormik }
