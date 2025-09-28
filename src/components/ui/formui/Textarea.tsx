import { TextareaHTMLAttributes } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type TextareaProps<T extends FieldValues> = {
  name: Path<T>
  register: UseFormRegister<T>
  formRules: Record<string, RegisterOptions | RegisterOptions<T, Path<T>>>
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>

export const Textarea = <T extends FieldValues>({
  name,
  register,
  formRules,
  ...props
}: TextareaProps<T>) => {
  return (
    <textarea
      id={name}
      className={`focus:border-accent2 border-accent1 border-b p-1 text-sm duration-300 focus:outline-none ${props.className ?? ''}`}
      {...register(name, formRules[name] as RegisterOptions<T, Path<T>>)}
      {...props}
    />
  )
}
