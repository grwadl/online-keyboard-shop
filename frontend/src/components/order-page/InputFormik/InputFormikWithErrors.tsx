import { ErrorMessage, Field, FieldProps, FormikErrors } from 'formik'
import { InputHTMLAttributes } from 'react'
import { InitialValue } from '../forms/OrderForm'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  classNameForInput?: string
  errors: FormikErrors<InitialValue>
  name: keyof FormikErrors<InitialValue>
  renderItem: (props: InputHTMLAttributes<HTMLInputElement>) => React.ReactNode
} & InputHTMLAttributes<HTMLImageElement>

function InputFormikWithErrors(props: Props) {
  const { className, name, renderItem, classNameForInput, ...other } = props

  return (
    <div className={`${className ?? ''}`}>
      <Field name={name}>
        {({ field }: FieldProps) => renderItem({ ...field, className: classNameForInput, ...other })}
      </Field>
      <ErrorMessage name={name}>{(msg) => <span className="block text-my-red mt-1">{msg}</span>}</ErrorMessage>
    </div>
  )
}

export { InputFormikWithErrors }
