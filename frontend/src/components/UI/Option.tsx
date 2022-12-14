type Props = {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

const Option = ({ checked, onChange, label }: Props) => {
  return (
    <label>
      <input onChange={onChange} checked={checked} type="checkbox" />
      {label}
    </label>
  )
}

export { Option }
