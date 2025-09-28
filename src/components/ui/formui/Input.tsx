import { InputHTMLAttributes } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
  name: Path<T>
  register?: UseFormRegister<T>
  formRules?: Record<string, RegisterOptions | RegisterOptions<T, Path<T>>>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

export const Input = <T extends FieldValues>({
  name,
  register,
  formRules,
  ...props
}: InputProps<T>) => {
  return (
    <input
      id={name}
      className={`w-full border-b border-accent1 p-1 text-sm duration-300 focus:border-accent2 focus:outline-none ${props.className ?? ''}`}
      {...(register
        ? register(name, (formRules?.[name] as RegisterOptions<T, Path<T>>) ?? {})
        : {})}
      {...props}
    />
  )
}
