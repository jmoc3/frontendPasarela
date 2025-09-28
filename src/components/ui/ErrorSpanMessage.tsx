import { FC, HTMLAttributes } from 'react'

type ErrorSpanMessageProps = {
  errorMessage: string
} & HTMLAttributes<HTMLSpanElement>

export const ErrorSpanMessage: FC<ErrorSpanMessageProps> = ({ errorMessage, ...props }) => {
  return <span className={`text-accent2 text-xs ${props.className ?? ''}`}>{errorMessage}</span>
}
