import { Loading } from '@/components/ui/Loading'
import { useAuthStore } from '@/stores/authStore'
import { JSX, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: JSX.Element
}

export const PublicRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    checkAuth().finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading svgClasses="!w-[3rem] !h-[3rem] duration-300 " color="accent2" bgColor="accent3" />
      </div>
    )

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
