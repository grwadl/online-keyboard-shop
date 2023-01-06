import { MyInput } from '@/components/UI/MyInput'
import { changeActiveField, clearActiveField, setSelectedValue } from '@/redux/actions/nova-poshta-actions'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { FieldProps, useField, useFormikContext } from 'formik'
import { batch } from 'react-redux'
import { InitialValue } from '../forms/OrderForm'
import './input-formik.scss'

type ExtendedFieldProps = FieldProps & {
  className?: string
}

const InputFormik = ({ field, className, disabled }: ExtendedFieldProps & { disabled?: boolean }) => {
  const [props] = useField(field)
  const { setFieldValue } = useFormikContext()
  const { name } = field

  const dispatch = useAppDispatch()
  const postReducer = useAppSelector(({ post }) => post)
  const onFocus = () => (name === 'city' || name === 'post') && dispatch(changeActiveField(name))
  const onBlur = (e: React.FocusEvent<HTMLDivElement>) =>
    !e.currentTarget.parentElement?.contains(e.relatedTarget) && dispatch(clearActiveField())

  return (
    <div className={`relative input-formik ${className}`} onBlur={onBlur}>
      <MyInput {...props} {...field} disabled={disabled} onFocus={onFocus} className="w-full" />
      {postReducer.activeField === name && postReducer[name].length !== 0 && (
        <div className="hint-wrapper absolute z-10 w-full top-7 left-0 overflow-y-scroll  max-h-32">
          {postReducer[name].map((hint, idx) => (
            <div
              tabIndex={idx}
              key={hint.Latitude}
              onClick={() => {
                batch(() => {
                  dispatch(clearActiveField())
                  dispatch(setSelectedValue(name, hint.Description))
                })
                setFieldValue(name, hint.Description)
              }}
              className="hint p-2 h-8 overflow-hidden bg-white cursor-pointer hover:bg-border-color duration-300"
            >
              {hint.Description}
            </div>
          ))}
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
