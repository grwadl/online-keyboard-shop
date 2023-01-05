import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

const useFormWithErrors = (
  onSubmitHandler: (data: Record<string, string>) => void,
  error: string | null,
  removeErrorUnmount: () => void
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
    watch
  } = useForm()

  useEffect(() => {
    removeErrorUnmount()
    return () => {
      removeErrorUnmount()
    }
  }, [submitCount])

  const errorToDisplay = useMemo<string>(() => {
    if (error) return error
    if (!errors) return ''
    return ((errors?.email?.message || errors?.password?.message) as string) ?? ''
  }, [errors, error])
  return { errorToDisplay, watch, register, handleSubmit: handleSubmit(onSubmitHandler) }
}

export { useFormWithErrors }
