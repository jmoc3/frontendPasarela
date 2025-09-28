import { SelectHTMLAttributes } from 'react'
import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

type OptionType = {
  id: string | number
  nombre: string
}

type TextareaProps<T extends FieldValues> = {
  name: Path<T>
  register: UseFormRegister<T>
  formRules: Record<string, RegisterOptions | RegisterOptions<T, Path<T>>>
  selectOptions: OptionType[]
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'>

export const Select = <T extends FieldValues>({
  name,
  register,
  formRules,
  selectOptions,
  ...props
}: TextareaProps<T>) => {
  return (
    <select
      className={`h-fit w-full border-b border-accent1 px-2 py-1 text-sm focus:border-accent2 focus:outline-none ${props.className ?? ''}`}
      defaultValue={1}
      id={name}
      {...register(name, formRules[name] as RegisterOptions<T, Path<T>>)}
      {...props}
    >
      <option value="">Seleccionar</option>
      {selectOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option>
      ))}
    </select>
  )
}
