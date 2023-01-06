import { ErrorMessage, Field, FieldProps, FormikErrors } from 'formik'
import { InputHTMLAttributes } from 'react'

type Props<T> = Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  classNameForInput?: string
  errors: FormikErrors<T>
  name: keyof FormikErrors<T>
  renderItem: (props: InputHTMLAttributes<HTMLInputElement>) => React.ReactNode
} & InputHTMLAttributes<HTMLImageElement>

function InputFormikWithErrors<T>(props: Props<T>) {
  const { className, name, renderItem, classNameForInput, ...other } = props

  return (
    <div className={`${className ?? ''}`}>
      <Field name={name}>
        {({ field }: FieldProps) => renderItem({ ...field, className: classNameForInput, ...other })}
      </Field>
      <ErrorMessage name={name}>{(msg) => <span className="block text-my-red mt-[2px]">{msg}</span>}</ErrorMessage>
    </div>
  )
}

export { InputFormikWithErrors }
