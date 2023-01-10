import Button from '@/components/UI/Button'
import { MyInput } from '@/components/UI/MyInput'
import { InputFormikWithErrors } from '@/components/order-page/InputFormik/InputFormikWithErrors'
import { profileSchema } from '@/components/profile-page/form/schema'
import { changeInfo } from '@/redux/actions/login-action'
import { useAppDispatch, useAppSelector } from '@/redux/common/hooks'
import { Form, Formik } from 'formik'
import { useMemo } from 'react'

const ProfilePage = () => {
  const { user } = useAppSelector(({ login }) => login)
  const dispatch = useAppDispatch()
  const userInitialValues = useMemo(
    () => ({
      name: user?.name ?? '',
      password: '',
      newPasswordConfirm: '',
      city: user?.city ?? '',
      postOffice: user?.postOffice ?? ''
    }),
    [user]
  )

  const onSubmit = (data: typeof userInitialValues) => {
    if (!user) return
    const dataToSend: Partial<typeof userInitialValues> = {}
    const keys = Object.keys(data) as (keyof typeof data)[]
    keys.forEach((key) => data[key] && (dataToSend[key] = data[key]))
    if (!Object.keys(dataToSend).length) return
    dispatch(changeInfo({ ...dataToSend, id: user?.id }))
  }

  return (
    <div className="profile page h-full">
      <h2 className="text-2xl font-bold mb-5">My profile</h2>
      <div className="mb-5">
        <span className="user-email-value text-xl font-bold mr-4">Email:</span>
        <span className="user-email-value text-lg">{user?.email}</span>
      </div>
      <Formik initialValues={userInitialValues} validationSchema={profileSchema} onSubmit={onSubmit}>
        {({ errors }) => (
          <Form className="flex flex-wrap justify-between">
            <div className="profile-info flex-wrap flex basis-full lg:basis-3/5 grow-0 justify-between">
              <h4 className="form-title text-lg font-semibold basis-full mb-6">Profile info</h4>
              <InputFormikWithErrors
                name="name"
                errors={errors}
                className="basis-full sm:basis-[48%] my-4"
                placeholder="Name"
                classNameForInput="w-full"
                renderItem={(p) => <MyInput {...p} />}
              />
              <InputFormikWithErrors
                name="password"
                errors={errors}
                className="basis-full sm:basis-[48%] my-4"
                placeholder="New password"
                classNameForInput="w-full"
                renderItem={(p) => <MyInput {...p} />}
              />
              <InputFormikWithErrors
                name="newPasswordConfirm"
                errors={errors}
                className="basis-full sm:basis-[48%] my-4"
                placeholder="Confirm new Password"
                classNameForInput="w-full"
                renderItem={(p) => <MyInput {...p} />}
              />
            </div>

            <div className="shipment-info flex-wrap flex basis-full lg:basis-3/5 mt-10 justify-between">
              <h4 className="form-title text-lg font-semibold basis-full mb-6">Shipment info</h4>
              <InputFormikWithErrors
                name="city"
                errors={errors}
                className="basis-full sm:basis-[48%] my-4"
                placeholder="City"
                classNameForInput="w-full"
                renderItem={(p) => <MyInput {...p} />}
              />
              <InputFormikWithErrors
                name="postOffice"
                errors={errors}
                className="basis-full sm:basis-[48%] my-4"
                placeholder="Post office"
                classNameForInput="w-full"
                renderItem={(p) => <MyInput {...p} />}
              />
            </div>
            <div className="basis-full mt-5">
              <Button className="px-10 py-2" type="submit">
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProfilePage
