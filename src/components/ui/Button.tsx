import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type ButtonProps = {
  colorType?: 'warm' | 'cold' | 'success' | 'danger'
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({ colorType = 'warm', children, ...props }) => {
  return (
    <button
      className={`w-fit rounded border border-amber-600 bg-white px-2 py-1 text-center text-amber-500 duration-300 hover:bg-amber-600 hover:text-white focus:outline-none ${props.className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
