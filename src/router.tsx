import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { LayoutPage } from '@/pages/Layout'
import { LogIn } from '@/pages/Login'
import { PrivateRoute } from '@/components/PrivateRoute'
import { SignUp } from '@/pages/SignUp'
import { PublicRoute } from '@/components/PublicRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LogIn />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        index: true,
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

export const Routes = () => <RouterProvider router={router} />
