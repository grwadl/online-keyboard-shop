import { FormObserver } from '@/components/order-page/forms/FormObserver'
import { formSchema } from '@/components/order-page/forms/schema'
import { InputFormik, InputPostFormik } from '@/components/order-page/InputFormik/InputFormik'
import { MyInput } from '@/components/UI/MyInput'
import { Field, FieldProps, Form, Formik, useFormik } from 'formik'

const onSubmit = (values: typeof initialValues) => console.log(values)

const initialValues = { name: '', email: '', number: '', post: '', city: '' }

const OrderPage = () => {
  const { handleSubmit } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: formSchema
  })

  return (
    <div className="order-page flex flex-wrap">
      <div className="order-page-forms flex-0 basis-3/5">
        <h2 className="order-confirm text-2xl  font-bold mb-5">Order confirmation</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form onSubmit={handleSubmit} className="forms flex flex-wrap gap-x-8">
            <FormObserver />
            <h4 className="form-title text-lg font-semibold basis-full mb-6">Customer info</h4>
            <Field name="name">{({ field }: FieldProps) => <MyInput className="basis-[40%] mb-5" {...field} />}</Field>
            <Field name="email">{({ field }: FieldProps) => <MyInput className="basis-[40%] mb-5" {...field} />}</Field>
            <Field name="number">
              {({ field }: FieldProps) => <MyInput className="basis-[40%] mb-5" {...field} />}
            </Field>
            <h4 className="form-title text-lg font-semibold basis-full mb-6">Shipment info</h4>
            <Field name="city">{(props: FieldProps) => <InputFormik className="basis-[40%] mb-5" {...props} />}</Field>
            <Field name="post">
              {(props: FieldProps) => <InputPostFormik className="basis-[40%] mb-5" {...props} />}
            </Field>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export { OrderPage }
export type InitialValue = typeof initialValues
