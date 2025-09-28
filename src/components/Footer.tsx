import { FC, HTMLAttributes } from 'react'

type FooterComponentProps = {} & HTMLAttributes<HTMLDivElement>

export const FooterComponent: FC<FooterComponentProps> = ({ ...props }) => {
  return (
    <div
      className={`absolute bottom-5 flex w-screen justify-center gap-1 text-sm ${props.className ?? ''}`}
    >
      <span className="opacity-40">Orejarena</span>
    </div>
  )
}
