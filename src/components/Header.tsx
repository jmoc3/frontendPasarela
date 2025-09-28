import { Button } from '@/components/ui/Button'
import { Loading } from '@/components/ui/Loading'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'
import { FC, HTMLAttributes } from 'react'

type HeaderComponentProps = {} & HTMLAttributes<HTMLDivElement>

export const HeaderComponent: FC<HeaderComponentProps> = ({ ...props }) => {
  const { logout, isAuthenticated } = useAuthStore()
  const { loading, setLoading } = useAppStore()

  const logoutSession = async () => {
    setLoading({ value: true, type: 'logout' })
    await logout()
    setLoading({ value: false, type: 'logout' })
  }
  return (
    <div
      className={`flex items-center justify-between border-b border-sec border-b-line bg-sec p-6 px-48 text-white ${props.className ?? ''}`}
    >
      <img className="w-32 rounded" src="\crosspay-solutions-logo-color.svg" alt="" />
      {isAuthenticated && (
        <div>
          {loading.value && loading.type == 'logout' ? (
            <Loading
              svgClasses="!w-[1rem] !h-[1rem] group-hover:text-white group-hover:fill-accent3 duration-300 "
              color="white"
              bgColor="accent3"
            />
          ) : (
            <Button
              onClick={logoutSession}
              className="group flex cursor-pointer items-center justify-center rounded border border-accent3 bg-sec px-2 py-1 text-center text-accent3 duration-300 hover:bg-accent3 hover:text-sec focus:outline-none"
            >
              Cerrar sesion
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
