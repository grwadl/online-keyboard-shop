import { MyInput } from '@/components/UI/MyInput'
import { InputFormik, InputPostFormik } from '@/components/order-page/InputFormik/InputFormik'
import { FormObserver } from '@/components/order-page/forms/FormObserver'
import { formSchema } from '@/components/order-page/forms/schema'
import { useAppSelector } from '@/redux/common/hooks'
import { Field, FieldProps, Form, Formik } from 'formik'
import { useMemo } from 'react'
import { InputFormikWithErrors } from '../InputFormik/InputFormikWithErrors'

//TODO: rewrite
const onSubmit = () => console.log('submitted')

export type InitialValue = {
  name: string
  email: string
  number: string
  city: string
  post: string
}
const OrderForm = () => {
  const { user } = useAppSelector(({ login }) => login)

  const initialValues = useMemo<InitialValue>(
    () => ({
      name: user?.name ?? '',
      email: user?.email ?? '',
      number: '',
      city: user?.city ?? '',
      post: user?.postOffice ?? ''
    }),
    [user]
  )

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
