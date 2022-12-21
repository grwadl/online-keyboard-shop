type Props = {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  className?: string
}

const Option = ({ checked, onChange, label, className }: Props) => {
  return (
    <label className={`block mt-4 relative option ${className}`}>
      <input
        name={label}
        onChange={onChange}
        checked={checked}
        type="checkbox"
      />
      <span className="checkmark"></span>
      <span className="ml-2 relative -top-[2px]">{label}</span>
    </label>
  )
}

export { Option }
