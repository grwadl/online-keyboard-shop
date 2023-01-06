import { InputHTMLAttributes } from 'react'

function BaseInputFormik<T extends InputHTMLAttributes<HTMLInputElement>>(props: T) {
  return <input {...props} />
}

export { BaseInputFormik }
