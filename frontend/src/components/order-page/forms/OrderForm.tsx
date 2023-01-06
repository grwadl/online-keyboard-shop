import { FormObserver } from '@/components/order-page/forms/FormObserver'
import { formSchema } from '@/components/order-page/forms/schema'
import { InputFormik, InputPostFormik } from '@/components/order-page/InputFormik/InputFormik'
import { MyInput } from '@/components/UI/MyInput'
import { Field, FieldProps, Form, Formik } from 'formik'
import { InputFormikWithErrors } from '../InputFormik/InputFormikWithErrors'

const onSubmit = () => console.log('submitted')

const initialValues = { name: '', email: '', number: '', post: '', city: '' }

const OrderForm = () => {
  return (
    <>
      <h2 className="order-confirm text-2xl  font-bold mb-5">Order confirmation</h2>
      <Formik validationSchema={formSchema} initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors }) => (
          <>
            <Form id="order-form" className="forms flex flex-wrap gap-x-8 justify-between">
              <FormObserver />
              <h4 className="form-title text-lg font-semibold basis-full mb-6">Customer info</h4>
              <InputFormikWithErrors
                placeholder="Name"
                errors={errors}
                name="name"
                renderItem={(props) => <MyInput {...props} />}
                className="mb-10"
                classNameForInput="basis-[48%] mb-2"
              />
              <InputFormikWithErrors
                errors={errors}
                placeholder="Email"
                name="email"
                renderItem={(props) => <MyInput {...props} />}
                className="mb-10"
                classNameForInput="basis-[48%] mb-2"
              />
              <InputFormikWithErrors
                errors={errors}
                placeholder="Phone number"
                name="number"
                renderItem={(props) => <MyInput {...props} />}
                className="mb-10"
                classNameForInput="basis-[48%] mb-2"
              />
              <h4 className="form-title text-lg font-semibold basis-full mb-6">Shipment info</h4>
              <Field name="city">
                {(props: FieldProps) => <InputFormik placeholder="City" className="basis-[48%] mb-10" {...props} />}
              </Field>
              <Field name="post">
                {(props: FieldProps) => (
                  <InputPostFormik placeholder="Post office" className="basis-[48%] mb-10" {...props} />
                )}
              </Field>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export { OrderForm }
export type InitialValue = typeof initialValues
