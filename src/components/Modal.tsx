import { FC, HTMLAttributes } from 'react'

type ModalComponentProps = {
  show: boolean
  children: React.ReactNode
  switchShow: () => void
} & HTMLAttributes<HTMLDivElement>

export const ModalComponent: FC<ModalComponentProps> = ({
  show,
  children,
  switchShow,
  ...props
}) => {
  return (
    show && (
      <div className={`${props.className ?? ''}`}>
        <div className="-z-index-50 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white px-8 py-6 shadow-lg">
          {children}
        </div>
      </div>
    )
  )
}
